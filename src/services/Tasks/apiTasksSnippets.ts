export type Task = {
  _id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetQueryAllTasksSnippet = {
  success: boolean;
  data: Task[];
};

export type GetQuerySingleTaskSnippet = {
  success: boolean;
  data: Task;
};

export type PostQueryCreateTaskSnippet = {
  success: boolean;
  data: Task;
};
export type PostQueryUpdateTaskSnippet = {
  success: boolean;
  data: Task;
};
export type PostQueryDeleteTaskSnippet = {
  success: boolean;
  message: string;
};
