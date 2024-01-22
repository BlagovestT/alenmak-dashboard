export type Patient = {
  _id: string;
  first_name: string;
  last_name: string;
  age: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetQueryPatientsSnippet = {
  sucess: boolean;
  data: Patient[];
};

export type GetQueryPatientSnippet = {
  sucess: boolean;
  data: Patient;
};

export type PostQueryCreatePatientSnippet = {
  sucess: boolean;
  data: Patient;
};

export type PostQueryUpdatePatientSnippet = {
  sucess: boolean;
  data: Patient;
};

export type PostQueryPatientPaidSnippet = {
  sucess: boolean;
  data: Patient;
};

export type PostQueryPatientUnpaidSnippet = {
  sucess: boolean;
  data: Patient;
};

export type PostQueryDeletePatientSnippet = {
  sucess: boolean;
  message: string;
};
