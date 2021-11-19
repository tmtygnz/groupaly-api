import { Timestamp } from "firebase-admin/firestore";

export interface IUser {
  name: string;
  dateCreated: Timestamp;
  key: string;
  sessionsDoneThisWeek: Array<number>;
  taskDoneThisWeek: Array<number>;
}
