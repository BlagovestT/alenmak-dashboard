export type PostQueryCreateStaffMemberInput = {
  first_name: string;
  last_name: string;
  salary: number;
};

export type PostQueryUpdateStaffMemberInput = {
  first_name: string;
  last_name: string;
  salary: number;
  status: "paid" | "unpaid";
};
