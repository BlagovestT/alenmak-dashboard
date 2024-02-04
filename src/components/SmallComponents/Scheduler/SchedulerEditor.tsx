import { useState } from "react";
import {
  CircularProgress,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import TextField from "@/components/MUIComponents/TextField";
import {
  DefaultRecourse,
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { Form, Formik } from "formik";
import { date, object, string } from "yup";
import DateAndTimePicker from "@/components/MUIComponents/DateAndTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@/components/MUIComponents/Select";
import { getShiftStartEndDate } from "@/helpers/helpers";
import { callApi } from "@/services/callApi";
import {
  PostQueryCreateEventSnippet,
  PostQueryUpdateEventSnippet,
} from "@/services/Events/apiEventsSnippets";
import {
  postQueryCreateEvent,
  postQueryUpdateEvent,
} from "@/services/Events/apiEventsPostQueries";
import { PostQueryCreateEventInput } from "@/services/Events/apiEventsInputs";

export type Shift = "firstShift" | "secondShift" | "fullDay";

type shiftsDataType = {
  description: string;
  value: Shift;
};

const fieldValidation = object({
  title: string().required("Полето е задължително"),
  start: date().required("Полето е задължително"),
  end: date().required("Полето е задължително"),
  staff_id: string().required("Полето е задължително"),
});

const SHIFTS_DATA: shiftsDataType[] = [
  { description: "I смяна", value: "firstShift" },
  { description: "II смяна", value: "secondShift" },
  { description: "24 часа", value: "fullDay" },
];

type SchedulerFormValues = {
  title: string;
  start: Date;
  end: Date;
  staff_id: string;
};

interface SchedulerEditorProps {
  scheduler: SchedulerHelpers;
  resources: DefaultRecourse[];
}

const SchedulerEditor = ({ scheduler, resources }: SchedulerEditorProps) => {
  const event = scheduler.edited;
  const eventState = scheduler.state;
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shift, setShift] = useState<Shift | null>(null);
  const initialValues: SchedulerFormValues = {
    title: event?.title || "",
    start: event?.start || eventState.start.value || new Date(),
    end: event?.end || eventState.end.value || new Date(),
    staff_id: (scheduler.staff_id as string) || "",
  };

  const handleButtonGroupChange = (
    shift: Shift,
    values: SchedulerFormValues
  ) => {
    setShift(shift);

    const shiftStartEndDate = getShiftStartEndDate(
      eventState.start.value,
      shift
    );

    if (shiftStartEndDate) {
      values.start = shiftStartEndDate?.start;
      values.end = shiftStartEndDate?.end;
    }
  };

  const handleFormSubmit = async (values: SchedulerFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const staffMember = resources.find(
        (resource) => resource.staff_id === values.staff_id
      );
      if (!staffMember) return;
      const event_id = event?.event_id.toString() || Math.random().toString();

      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: event_id,
          title: values.title,
          start: values.start,
          end: values.end,
          staff_id: values.staff_id,
          color: staffMember.color,
        });
      })) as ProcessedEvent;

      const body: PostQueryCreateEventInput = {
        event_id: event_id,
        title: values.title,
        start: values.start,
        end: values.end,
        staff_id: values.staff_id,
        color: staffMember.color ?? "",
      };

      if (event) {
        const updatedEvent = await callApi<PostQueryUpdateEventSnippet>({
          query: postQueryUpdateEvent(body, event.event_id.toString()),
        });

        if (updatedEvent.success) {
          scheduler.onConfirm(updatedEvent.data, "edit");
          setLoading(false);
          scheduler.close();
        }
      } else {
        const newEvent = await callApi<PostQueryCreateEventSnippet>({
          query: postQueryCreateEvent(body),
        });

        if (newEvent.success) {
          scheduler.onConfirm(newEvent.data, "create");
          setLoading(false);
          scheduler.close();
        }
      }

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } catch (error) {
      console.log((error as Error).message);
      setFormStatus("error");
      setAlertMessage("Възникна грешка, моля опитайте отново!");
      setLoading(false);
    }
  };

  return (
    <Stack width="35rem" p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h4" variant="h3">
          {scheduler.edited ? `Промени ${event?.title}` : "Добави Смяна"}
        </Typography>

        <IconButton onClick={() => scheduler.close()}>
          <CloseIcon />
        </IconButton>
      </Stack>

      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={fieldValidation}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} mt={3}>
                <TextField
                  name="title"
                  label="Заглавие"
                  error={touched["title"] && !!errors["title"]}
                  helperText={touched["title"] && errors["title"]}
                  onChange={handleChange}
                  value={values.title}
                  type="text"
                />

                <ToggleButtonGroup
                  color="primary"
                  value={shift}
                  exclusive
                  onChange={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                    handleButtonGroupChange((e as any).target.value, values)
                  }
                  fullWidth
                >
                  {SHIFTS_DATA.map((shiftItem) => (
                    <ToggleButton
                      key={shiftItem.value}
                      value={shiftItem.value}
                      sx={{ fontSize: "1rem", textTransform: "none" }}
                    >
                      {shiftItem.description}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>

                <DateAndTimePicker
                  name="start"
                  label="Начална дата"
                  onChange={(e) => (values.start = e as Date)}
                  error={touched["start"] && !!errors["start"]}
                  helperText={touched["start"] && errors["start"]}
                  value={values.start}
                  type="datetime"
                />

                <DateAndTimePicker
                  name="end"
                  label="Крайна дата"
                  onChange={(e) => (values.end = e as Date)}
                  error={touched["end"] && !!errors["end"]}
                  helperText={touched["end"] && errors["end"]}
                  value={values.end}
                />

                <Select
                  name="staff_id"
                  label="Служител"
                  selectValues={resources.map((resource) => {
                    return {
                      label: resource.title,
                      value: resource.staff_id,
                    };
                  })}
                  value={values.staff_id}
                  helperText={touched["staff_id"] && errors["staff_id"]}
                  error={touched["staff_id"] && !!errors["staff_id"]}
                  onChange={handleChange}
                />

                <Button
                  message={scheduler.edited ? "Запази" : "Създай"}
                  type="submit"
                />

                <Alert
                  message={alertMessage}
                  showAlert={!!alertMessage}
                  severity={formStatus}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Stack justifyContent="center" alignItems="center" my={5}>
          <CircularProgress size="3rem" />
        </Stack>
      )}
    </Stack>
  );
};

export default SchedulerEditor;
