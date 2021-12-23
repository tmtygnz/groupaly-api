import { red } from "../clog/clog";
import { IUser } from "../firebase/user/IUser";

export let participants:Array<IParticipant> = [];

export const addParticipant = (User: IUser, sid: string) => {
  const participant: IParticipant = {
    user: User,
    sid: sid,
  };
  participants.push(participant);
};

export const removeParticipant = (participant: IParticipant) => {
  const i = participants.indexOf(participant);
  if (i > 0){
  
  }
}

export const getParticipantsFromSession = (sid: string) => {
  const participantsInSession = participants.filter(users => users.sid == sid);
  return participantsInSession;
}

export interface IParticipant {
  user: IUser;
  sid: string;
}
