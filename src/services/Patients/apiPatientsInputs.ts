export type PostQueryCreatePatientInput = {
  first_name: string;
  last_name: string;
  age: number;
};

export type PostQueryUpdatePatientInput = {
  first_name: string;
  last_name: string;
  salary: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
};
