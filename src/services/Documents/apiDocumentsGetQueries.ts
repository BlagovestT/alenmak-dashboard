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

export const getQueryDownloadDocument = (documentId: string): Query => ({
  endpoint: `/document/download/${documentId}`,
  method: "GET",
  blob: true,
});

export const getQueryPreviewDocument = (documentId: string): Query => ({
  endpoint: `/document/preview/${documentId}`,
  method: "GET",
});
