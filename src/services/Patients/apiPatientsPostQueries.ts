import { Query } from "../apiTypes";
import {
  PostQueryCreatePatientInput,
  PostQueryUpdatePatientInput,
} from "./apiPatientsInputs";

export const postQueryCreatePatient = (
  input: PostQueryCreatePatientInput
): Query => ({
  endpoint: "/patient/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdatePatient = (
  patientId: string,
  input: PostQueryUpdatePatientInput
): Query => ({
  endpoint: `/patient/${patientId}`,
  method: "PUT",
  variables: input,
});

export const postQueryPatientPaid = (patientId: string): Query => ({
  endpoint: `/patient/pay/${patientId}`,
  method: "PUT",
});

export const postQueryPatientUnpaid = (patientId: string): Query => ({
  endpoint: `/patient/unpay/${patientId}`,
  method: "PUT",
});

export const postQueryDeletePatient = (patientId: string): Query => ({
  endpoint: `/patient/${patientId}`,
  method: "DELETE",
});
