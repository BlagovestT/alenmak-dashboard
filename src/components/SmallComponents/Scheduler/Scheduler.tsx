"use client";
import { Scheduler as MUIScheduler } from "@aldabil/react-scheduler";
import { DAY, FIELDS, MONTH, RESOURCE_FIELDS, WEEK } from "./schedulerData";
import { SchedulerLocale } from "@/components/SmallComponents/Scheduler/SchedulerLocale";
import { View } from "@aldabil/react-scheduler/components/nav/Navigation";
import {
  DefaultRecourse,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import SchedulerResourceHeader from "./SchedulerResourceHeader";

interface SchedulerProps {
  events: ProcessedEvent[];
  resources: DefaultRecourse[];
  loading?: boolean;
  view?: View;
  resourceViewMode?: "tabs" | "default";
}

const Scheduler: React.FC<SchedulerProps> = ({
  view = "month",
  events,
  resources,
  resourceViewMode = "tabs",
  loading,
}) => {
  return (
    <MUIScheduler
      resourceViewMode={resourceViewMode}
      view={view}
      events={events}
      resources={resources}
      hourFormat="24"
      translations={SchedulerLocale}
      resourceFields={RESOURCE_FIELDS}
      fields={FIELDS(resources)}
      loading={loading}
      month={MONTH}
      week={WEEK}
      day={DAY}
      resourceHeaderComponent={(resource) => (
        <SchedulerResourceHeader resource={resource} />
      )}
    />
  );
};

export default Scheduler;
