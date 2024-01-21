export type ResponseError = {
  detail: string;
};

export type Query = {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  variables?: { [key: string]: any };
  input?: string;
  multipart?: boolean;
  blob?: boolean;
};

export type CallApiParams = {
  query: Query;
};
