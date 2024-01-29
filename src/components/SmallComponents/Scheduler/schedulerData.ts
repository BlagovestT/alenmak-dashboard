import {
  DefaultRecourse,
  FieldProps,
  ResourceFields,
} from "@aldabil/react-scheduler/types";
import { DayProps } from "@aldabil/react-scheduler/views/Day";
import { MonthProps } from "@aldabil/react-scheduler/views/Month";
import { WeekProps } from "@aldabil/react-scheduler/views/Week";

export const MONTH: MonthProps = {
  weekDays: [2, 3, 4, 5, 6, 0, 1],
  weekStartOn: 6,
  startHour: 0,
  endHour: 24,
};

export const WEEK: WeekProps = {
  weekDays: [2, 3, 4, 5, 6, 0, 1],
  weekStartOn: 6,
  startHour: 0,
  endHour: 24,
  step: 60,
};

export const DAY: DayProps = {
  startHour: 0,
  endHour: 24,
  step: 60,
};

export const RESOURCE_FIELDS: ResourceFields = {
  idField: "staff_id",
  textField: "title",
  subTextField: "salary",
  avatarField: "avatar",
  colorField: "color",
};

export const FIELDS = (resources: DefaultRecourse[]): FieldProps[] => {
  return [
    {
      name: "staff_id",
      type: "select",
      default: resources[0]?.staff_id,
      options: resources.map((res) => {
        return {
          id: res.staff_id,
          text: res.title,
          value: res.staff_id,
        };
      }),
      config: { label: "Работник", required: true },
    },
  ];
};
