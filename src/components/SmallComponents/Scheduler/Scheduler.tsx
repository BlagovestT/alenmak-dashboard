"use client";
import { Scheduler as MUIScheduler } from "@aldabil/react-scheduler";
import { DAY, FIELDS, MONTH, RESOURCE_FIELDS, WEEK } from "./schedulerData";
import { SchedulerLocale } from "@/components/SmallComponents/Scheduler/SchedulerLocale";
import { View } from "@aldabil/react-scheduler/components/nav/Navigation";
import {
  DefaultRecourse,
  EventActions,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import SchedulerResourceHeader from "./SchedulerResourceHeader";
import { callApi } from "@/services/callApi";
import {
  GetQueryAllEventsSnippet,
  PostQueryCreateEventSnippet,
  PostQueryDeleteEventSnippet,
  PostQueryUpdateEventSnippet,
} from "@/services/Events/apiEventsSnippets";
import {
  postQueryCreateEvent,
  postQueryDeleteEvent,
  postQueryUpdateEvent,
} from "@/services/Events/apiEventsPostQueries";
import { getQueryAllEvents } from "@/services/Events/apiEventsGetQueries";

interface SchedulerProps {
  events?: ProcessedEvent[];
  resources: DefaultRecourse[];
  loading?: boolean;
  view?: View;
  resourceViewMode?: "tabs" | "default";
  showResources?: boolean;
}

const Scheduler: React.FC<SchedulerProps> = ({
  view = "month",
  events,
  resources,
  resourceViewMode = "tabs",
  loading,
  showResources,
}) => {
  const handleGetAllEvents = async (): Promise<ProcessedEvent[]> => {
    return new Promise(async (res) => {
      try {
        const eventsData = await callApi<GetQueryAllEventsSnippet>({
          query: getQueryAllEvents,
        });

        const filteredEventsData = {
          ...eventsData,
          data: eventsData.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          })),
        };

        if (eventsData.success) {
          res(filteredEventsData.data);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleCreateEditConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    return new Promise(async (res) => {
      if (action === "edit") {
        const updatedEvent = await callApi<PostQueryUpdateEventSnippet>({
          query: postQueryUpdateEvent(
            {
              title: event.title,
              start: event.start,
              end: event.end,
              staff_id: event.staff_id,
              color: "red",
            },
            event.event_id.toString()
          ),
        });

        if (updatedEvent.success) {
          res(event);
        }
      } else if (action === "create") {
        const newEvent = await callApi<PostQueryCreateEventSnippet>({
          query: postQueryCreateEvent({
            event_id: Math.random().toString(),
            title: event.title,
            start: event.start,
            end: event.end,
            staff_id: event.staff_id,
            color: "red",
          }),
        });

        if (newEvent.success) {
          res({
            ...event,
            event_id: newEvent.data.event_id,
          });
        }
      }
    });
  };

  const handleEventDragged = async (
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent
  ): Promise<void | ProcessedEvent> => {
    return new Promise(async (res) => {
      try {
        const newEvent = await callApi<PostQueryUpdateEventSnippet>({
          query: postQueryUpdateEvent(
            {
              title: originalEvent.title,
              start: updatedEvent.start,
              end: updatedEvent.end,
              staff_id: originalEvent.staff_id,
              color: originalEvent.color || "",
            },
            originalEvent.event_id.toString()
          ),
        });

        if (newEvent.success) {
          res(newEvent.data);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleEventDelete = async (deletedId: string): Promise<string> => {
    return new Promise(async (res: any) => {
      try {
        const deletedEvent = await callApi<PostQueryDeleteEventSnippet>({
          query: postQueryDeleteEvent(deletedId),
        });

        if (deletedEvent.success) {
          res(deletedId);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <MUIScheduler
      getRemoteEvents={handleGetAllEvents}
      resourceViewMode={resourceViewMode}
      view={view}
      events={events ? events : []}
      resources={showResources ? resources : []}
      hourFormat="24"
      translations={SchedulerLocale}
      resourceFields={RESOURCE_FIELDS}
      fields={FIELDS(resources)}
      loading={loading}
      month={MONTH}
      week={WEEK}
      day={DAY}
      onConfirm={handleCreateEditConfirm}
      onDelete={handleEventDelete}
      onEventDrop={handleEventDragged}
      resourceHeaderComponent={(resource) => (
        <SchedulerResourceHeader resource={resource} />
      )}
    />
  );
};

export default Scheduler;
