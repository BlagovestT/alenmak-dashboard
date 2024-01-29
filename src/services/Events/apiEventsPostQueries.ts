import { Query } from "../apiTypes";
import {
  PostQueryCreateEventInput,
  PostQueryUpdateEventInput,
} from "./apiEventsInputs";

export const postQueryCreateEvent = (
  body: PostQueryCreateEventInput
): Query => ({
  endpoint: `/event/create`,
  method: "POST",
  variables: body,
});

export const postQueryUpdateEvent = (
  body: PostQueryUpdateEventInput,
  eventId: string
): Query => ({
  endpoint: `/event/${eventId}`,
  method: "PUT",
  variables: body,
});

export const postQueryDeleteEvent = (eventId: string): Query => ({
  endpoint: `/event/${eventId}`,
  method: "DELETE",
});
