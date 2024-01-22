import { Query } from "../apiTypes";

export const getQueryStaffMembers: Query = {
  endpoint: `/staff/members`,
  method: "GET",
};

export const getQueryStaffMember = (staffId: string): Query => ({
  endpoint: `/staff/member/${staffId}`,
  method: "GET",
});
