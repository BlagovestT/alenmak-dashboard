import { Query } from "../apiTypes";

export const getQueryPatients: Query = {
  endpoint: `/patient/all`,
  method: "GET",
};

export const getQueryPatient = (patientId: string): Query => ({
  endpoint: `/patient/${patientId}`,
  method: "GET",
});
