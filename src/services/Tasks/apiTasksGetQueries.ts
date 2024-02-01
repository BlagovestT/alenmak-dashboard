import { Query } from "../apiTypes";

export const getQueryAllTasks: Query = {
  endpoint: `/tasks/all`,
  method: "GET",
};

export const getQuerySingleTask = (taskId: string): Query => ({
  endpoint: `/tasks/${taskId}`,
  method: "GET",
});
