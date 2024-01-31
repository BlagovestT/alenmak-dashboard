import { Shift } from "@/components/SmallComponents/Scheduler/SchedulerEditor";

export const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const cookies: string[] = document.cookie.split("; ");

    if (!cookies) return;

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
};

export const getUserAccessToken = () => {
  let accessCookie: string = "";
  const cookiesArray: string[] = document.cookie.split("; ");

  if (!cookiesArray) return;

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie: string = cookiesArray[i];
    const [name, value] = cookie.split("=");
    if (name === "accessToken") {
      accessCookie = value;
      break;
    }
  }

  return accessCookie;
};

export const formatDate = (date: Date) => {
  const dateString = date;
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
};

export const getShiftStartEndDate = (startDate: Date, shift: Shift) => {
  switch (shift) {
    case "firstShift":
      return {
        start: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          7,
          0,
          0
        ),
        end: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          19,
          0,
          0
        ),
      };
    case "secondShift":
      return {
        start: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          19,
          0,
          0
        ),
        end: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 1,
          7,
          0,
          0
        ),
      };

    case "fullDay":
      return {
        start: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          7,
          0,
          0
        ),
        end: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 1,
          7,
          0,
          0
        ),
      };
    default:
      break;
  }
};

export const USER_ID = getCookie("id");
export const USERNAME = getCookie("username");
export const USER_EMAIL = getCookie("email");
export const USER_ROLE = getCookie("role");
export const USER_ACCESSTOKEN = getCookie("accessToken");
