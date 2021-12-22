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
  for (let i = 0; i != participants.length; i++){
    if (participants[i] == participant){
      participants.slice(i,1);
      break;
    }
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
