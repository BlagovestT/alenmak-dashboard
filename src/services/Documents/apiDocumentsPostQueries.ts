import { Query } from "../apiTypes";
import { PostQueryCreateDocumentInput } from "./apiDocumentsInputs";

export const postQueryCreateDocument = (
  owner: string,
  input: PostQueryCreateDocumentInput
): Query => ({
  endpoint: `/document/${owner}/create`,
  method: "POST",
  variables: input,
  multipart: true,
});

export const postQueryDeleteDocument = (id: string): Query => ({
  endpoint: `/document/delete/${id}`,
  method: "DELETE",
});
