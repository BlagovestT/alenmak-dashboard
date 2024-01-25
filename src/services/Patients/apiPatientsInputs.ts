export type PostQueryCreatePatientInput = {
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  age: number;
  group: "група а" | "група б";
};

export type PostQueryUpdatePatientInput = {
  first_name?: string;
  last_name?: string;
  gender?: "male" | "female";
  age?: number;
  group?: "група а" | "група б";
  paid?: "paid" | "unpaid";
  status?: "active" | "inactive" | "released" | "deceased";
};
