import { Query } from "../apiTypes";
import {
  PostQueryCreateStaffMemberInput,
  PostQueryUpdateStaffMemberInput,
} from "./apiStaffInputs";

export const postQueryCreateStaffMember = (
  input: PostQueryCreateStaffMemberInput
): Query => ({
  endpoint: "/staff/member/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdateStaffMember = (
  staffId: string,
  input: PostQueryUpdateStaffMemberInput
): Query => ({
  endpoint: `/staff/member/${staffId}`,
  method: "PUT",
  variables: input,
});

export const postQueryPayStaffMember = (staffId: string): Query => ({
  endpoint: `/staff/member/${staffId}/pay`,
  method: "PUT",
});

export const postQueryUnpayStaffMember = (staffId: string): Query => ({
  endpoint: `/staff/member/${staffId}/unpay`,
  method: "PUT",
});

export const postQueryDeleteStaffMember = (staffId: string): Query => ({
  endpoint: `/staff/member/${staffId}`,
  method: "DELETE",
});
