import { Timestamp } from "firebase-admin/firestore";

export interface IUser {
  name: string;
  dateCreated: Timestamp;
  key: string;
  sessionsCompletedThisWeek: Array<number>;
  taskCompletedThisWeek: Array<number>;
  numSessionsCompleted: number;
  numTaskCompleted: number;
}
