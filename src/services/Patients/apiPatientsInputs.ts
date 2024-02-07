export type PostQueryCreatePatientInput = {
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  age: number;
  group: "група 1" | "група 2" | "група 3" | "група 4";
};

export type PostQueryUpdatePatientInput = {
  first_name?: string;
  last_name?: string;
  gender?: "male" | "female";
  age?: number;
  group?: "група 1" | "група 2" | "група 3" | "група 4";
  paid?: "paid" | "unpaid";
  status?: "active" | "inactive" | "released" | "deceased";
};
