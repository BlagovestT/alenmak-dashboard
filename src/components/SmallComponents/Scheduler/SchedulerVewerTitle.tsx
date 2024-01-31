import { useEffect, useState } from "react";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { Skeleton, Stack, Typography, useTheme } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import PersonIcon from "@mui/icons-material/Person";
import { formatDate } from "@/helpers/helpers";
import {
  GetQueryStaffMemberSnippet,
  Staff,
} from "@/services/Staff/apiStaffSnippets";
import { callApi } from "@/services/callApi";
import { getQueryStaffMember } from "@/services/Staff/apiStaffGetQueries";

interface SchedulerVewerTitleProps {
  event: ProcessedEvent;
}

const SchedulerVewerTitle: React.FC<SchedulerVewerTitleProps> = ({ event }) => {
  const theme = useTheme();
  const [staff, setStaff] = useState<Staff>();

  useEffect(() => {
    (async () => {
      try {
        const staffData = await callApi<GetQueryStaffMemberSnippet>({
          query: getQueryStaffMember(event.staff_id),
        });

        if (staffData.success) {
          setStaff(staffData.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [event.staff_id]);

  return (
    <Stack style={{ fontSize: "1.2rem" }} py={1} gap={1}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Заглавие: {event.title}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventAvailableIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Начало: {formatDate(event.start)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventBusyIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Край: {formatDate(event.end)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <PersonIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Служител:
        </Typography>
        <Typography component="p" variant="body1">
          {staff ? (
            ` ${staff.first_name} ${staff.last_name}`
          ) : (
            <Skeleton variant="rounded" width={160} height={20} />
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SchedulerVewerTitle;
