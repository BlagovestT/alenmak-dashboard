"use client";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import Scheduler from "@/components/SmallComponents/Scheduler/Scheduler";
import { callApi } from "@/services/callApi";
import { GetQueryStaffMembersSnippet } from "@/services/Staff/apiStaffSnippets";
import { getQueryStaffMembers } from "@/services/Staff/apiStaffGetQueries";
import {
  DefaultRecourse,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import Button from "@/components/MUIComponents/Button";
import { GetQueryAllEventsSnippet } from "@/services/Events/apiEventsSnippets";
import { getQueryAllEvents } from "@/services/Events/apiEventsGetQueries";

type SchedulerViewMode = "scheduler" | "staffScheduler";

const SchedulePage = () => {
  const [eventsData, setEventsData] = useState<ProcessedEvent[]>();
  const [resourcesData, setResourcesData] = useState<DefaultRecourse[]>();
  const [view, setView] = useState<SchedulerViewMode>("scheduler");

  useEffect(() => {
    (async () => {
      const eventsData = await callApi<GetQueryAllEventsSnippet>({
        query: getQueryAllEvents,
      });

      const staffData = await callApi<GetQueryStaffMembersSnippet>({
        query: getQueryStaffMembers,
      });

      if (eventsData.success) {
        const filteredEventsData = {
          ...eventsData,
          data: eventsData.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          })),
        };

        setEventsData(filteredEventsData.data);
      }

      if (staffData.success) {
        const filteredStaffData = staffData.data.map((staff) => ({
          staff_id: staff._id,
          title: `${staff.first_name} ${staff.last_name}`,
          salary: staff.status,
          avatar: `${staff.first_name.charAt(0).toUpperCase()}${staff.last_name
            .charAt(0)
            .toUpperCase()}`,
          color: staff.color,
          role: staff.occupation,
        }));

        setResourcesData(filteredStaffData);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader
        header="График"
        subheader="График на вашите служители"
        action={
          <Button
            message={
              view === "scheduler" ? "График на Служители" : "Общ График"
            }
            onClick={() =>
              setView((prevView) =>
                prevView === "scheduler" ? "staffScheduler" : "scheduler"
              )
            }
          />
        }
      />

      <Box width="100%" px={4} py={2}>
        {view === "scheduler" && (
          <>
            {resourcesData ? (
              <Scheduler
                events={eventsData}
                resources={resourcesData}
                showResources={false}
                setEventsData={setEventsData}
              />
            ) : (
              <Stack height="600px" justifyContent="center" alignItems="center">
                <CircularProgress size="8rem" />
              </Stack>
            )}
          </>
        )}

        {view === "staffScheduler" && (
          <>
            {resourcesData ? (
              <Scheduler
                events={eventsData}
                resources={resourcesData}
                showResources={true}
                setEventsData={setEventsData}
              />
            ) : (
              <Stack height="600px" justifyContent="center" alignItems="center">
                <CircularProgress size="8rem" />
              </Stack>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default SchedulePage;
