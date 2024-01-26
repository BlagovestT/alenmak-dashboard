import { Query } from "../apiTypes";

export const getQueryAllDocuments: Query = {
  endpoint: `/document/all`,
  method: "GET",
};

export const getQuerySingleDocument = (documentId: string): Query => ({
  endpoint: `/document/${documentId}`,
  method: "GET",
});

export const getQueryDocumentByOwnerId = (documentId: string): Query => ({
  endpoint: `/document/owner/${documentId}`,
  method: "GET",
});

export const getQueryDownloadDocument = (fileName: string): Query => ({
  endpoint: `/document/download/${fileName}`,
  method: "GET",
  blob: true,
});

export const getQueryPreviewDocument = (fileName: string): Query => ({
  endpoint: `/document/preview/${fileName}`,
  method: "GET",
});
