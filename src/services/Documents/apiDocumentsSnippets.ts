export type Document = {
  _id: string;
  owner: string;
  file_name: string;
  file_size: number;
  file_type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetQueryDocumentByOwnerIdSnippet = {
  success: boolean;
  data: Document[];
};

export type GetQueryPreviewDocumentSnippet = {
  success: boolean;
  data: string;
};

export type PostQueryCreateDocumentSnippet = {
  success: boolean;
  data: Document;
};

export type PostQueryDeleteDocumentSnippet = {
  success: boolean;
  message: string;
};
