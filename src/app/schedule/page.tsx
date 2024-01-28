"use client";
// https://www.npmjs.com/package/@aldabil/react-scheduler
import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import Scheduler from "@/components/SmallComponents/Scheduler/Scheduler";
import { EVENTS } from "@/components/SmallComponents/Scheduler/schedulerData";
import { callApi } from "@/services/callApi";
import { GetQueryStaffMembersSnippet } from "@/services/Staff/apiStaffSnippets";
import { getQueryStaffMembers } from "@/services/Staff/apiStaffGetQueries";
import { DefaultRecourse } from "@aldabil/react-scheduler/types";

const SchedulePage = () => {
  const [resourcesData, setResourcesData] = useState<DefaultRecourse[]>();

  useEffect(() => {
    (async () => {
      const staffData = await callApi<GetQueryStaffMembersSnippet>({
        query: getQueryStaffMembers,
      });

      if (staffData.success) {
        const filteredStaffData = staffData.data.map((staff) => ({
          staff_id: staff._id,
          title: `${staff.first_name} ${staff.last_name}`,
          salary: staff.status,
          avatar: `${staff.first_name.charAt(0).toUpperCase()}${staff.last_name
            .charAt(0)
            .toUpperCase()}`,
          color: "#ab2d2d",
        }));

        setResourcesData(filteredStaffData);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader header="График" subheader="График на вашите служители" />

      <Box width="100%" px={4} py={2}>
        {resourcesData ? (
          <Scheduler events={EVENTS} resources={resourcesData} />
        ) : (
          <Stack height="600px" justifyContent="center" alignItems="center">
            <CircularProgress size="8rem" />
          </Stack>
        )}
      </Box>
    </>
  );
};

export default SchedulePage;
