export type Staff = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  occupation:
    | "Санитар"
    | "Медицинска Сестра"
    | "Управител"
    | "Готвач"
    | "Социален Работник"
    | "Рехабилитатор"
    | "Болногледач";
  salary: number;
  status: "paid" | "unpaid";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetQueryStaffMembersSnippet = {
  success: boolean;
  data: Staff[];
};

export type GetQueryStaffMemberSnippet = {
  success: boolean;
  data: Staff;
};

export type PostQueryCreateStaffMemberSnippet = {
  success: boolean;
  data: Staff;
};

export type PostQueryUpdateStaffMemberSnippet = {
  success: boolean;
  data: Staff;
};

export type PostQueryPayStaffMemberSnippet = {
  success: boolean;
  data: Staff;
};

export type PostQueryUnpayStaffMemberSnippet = {
  success: boolean;
  data: Staff;
};

export type PostQueryDeleteStaffMemberSnippet = {
  success: boolean;
  message: string;
};
