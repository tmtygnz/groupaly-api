import { Socket } from "socket.io";
import { red } from "../clog/clog";
import { IUser } from "../firebase/user/IUser";

export let participants:Array<IParticipant> = [];
export let sockets:Array<Socket> = []

export const addParticipant = (User: IUser, sid: string, socket: Socket) => {
  const participant: IParticipant = {
    user: User,
    sid: sid,
  };
  participants.push(participant);
  sockets.push(socket);
};

export const removeParticipant = (socket: Socket) => {
  const i = sockets.indexOf(socket);
  sockets.splice(i, 1);
  participants.splice(i, 1);
}

export const getParticipantsFromSession = (sid: string) => {
  const participantsInSession = participants.filter(users => users.sid == sid);
  return participantsInSession;
}

export interface IParticipant {
  user: IUser;
  sid: string;
}
