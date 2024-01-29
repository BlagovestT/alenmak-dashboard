export type PostQueryCreateEventInput = {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  staff_id: string;
  color: string;
};

export type PostQueryUpdateEventInput = {
  title: string;
  start: Date;
  end: Date;
  staff_id: string;
  color: string;
};
