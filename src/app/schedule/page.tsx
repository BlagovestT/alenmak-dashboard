"use client";
// https://www.npmjs.com/package/@aldabil/react-scheduler
import { Box } from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import { Scheduler } from "@aldabil/react-scheduler";

const SchedulePage = () => {
  return (
    <>
      <PageHeader header="График" subheader="График на вашите служители" />
      <Box width="100%" px={4} py={2}>
        <Scheduler
          view="month"
          events={[
            {
              event_id: 1,
              title: "Event 1",
              start: new Date("2024/1/2 09:30"),
              end: new Date("2024/1/2 10:30"),
            },
            {
              event_id: 2,
              title: "Event 2",
              start: new Date("2024/1/4 10:00"),
              end: new Date("2024/1/4 11:00"),
              color: "blue",
            },
          ]}
        />
      </Box>
    </>
  );
};

export default SchedulePage;
