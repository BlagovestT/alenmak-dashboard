export type PostQueryCreateStaffMemberInput = {
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
};

export type PostQueryUpdateStaffMemberInput = {
  first_name?: string;
  last_name?: string;
  gender?: "male" | "female";
  occupation?:
    | "Санитар"
    | "Медицинска Сестра"
    | "Управител"
    | "Готвач"
    | "Социален Работник"
    | "Рехабилитатор"
    | "Болногледач";
  salary?: number;
  status?: "paid" | "unpaid";
};
