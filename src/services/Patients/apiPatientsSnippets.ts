export type Patient = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  group: "група а" | "група б";
  age: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetQueryPatientsSnippet = {
  success: boolean;
  data: Patient[];
};

export type GetQueryPatientSnippet = {
  success: boolean;
  data: Patient;
};

export type PostQueryCreatePatientSnippet = {
  success: boolean;
  data: Patient;
};

export type PostQueryUpdatePatientSnippet = {
  success: boolean;
  data: Patient;
};

export type PostQueryPatientPaidSnippet = {
  success: boolean;
  data: Patient;
};

export type PostQueryPatientUnpaidSnippet = {
  success: boolean;
  data: Patient;
};

export type PostQueryDeletePatientSnippet = {
  success: boolean;
  message: string;
};
