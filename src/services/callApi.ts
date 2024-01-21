import axios, { AxiosRequestConfig } from "axios";
import { CallApiParams } from "./apiTypes";
import { USER_ACCESSTOKEN } from "@/helpers/helpers";

export const API_LINK_URL = process.env.NEXT_PUBLIC_API_LINK;

export const callApi = async <T>(params: CallApiParams): Promise<T> => {
  const { query } = params;
  const { endpoint, method, variables, input, multipart, blob } = query;

  if (!API_LINK_URL) {
    throw new Error("API_URL is not defined");
  }

  const url = `${API_LINK_URL}${endpoint}${input ? `/${input}` : ""}`;

  const accessCookie = USER_ACCESSTOKEN;

  if (accessCookie) {
    const config: AxiosRequestConfig = {
      method,
      headers: {
        "Content-Type": multipart ? "multipart/form-data" : "application/json",
        Authorization: `Bearer ${accessCookie}`,
      },
      responseType: blob ? "blob" : "json",
      data: variables,
    };

    try {
      const response = await axios(url, config);
      return response.data;
    } catch (error) {
      console.log("API err ", error);
      throw new Error(`API error - ${(error as Error).message}`);
    }
  } else {
    throw new Error("Access Cookie is not defined");
    // signOut();
  }
};
