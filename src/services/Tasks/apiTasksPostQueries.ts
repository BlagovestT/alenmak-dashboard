import { Query } from "../apiTypes";
import {
  PostQueryCreateTaskInput,
  PostQueryUpdateTaskInput,
} from "./apiTasksInputs";

export const postQueryCreateTask = (
  input: PostQueryCreateTaskInput
): Query => ({
  endpoint: "/tasks/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdateTask = (
  taskId: string,
  input: PostQueryUpdateTaskInput
): Query => ({
  endpoint: `/tasks/${taskId}`,
  method: "PUT",
  variables: input,
});

export const postQueryDeleteTask = (taskId: string): Query => ({
  endpoint: `/tasks/${taskId}`,
  method: "DELETE",
});
