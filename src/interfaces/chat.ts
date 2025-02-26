export interface ChatMessage {
  senderNick: string;
  message: string;
  timestamp?: string;
}
export interface FriendNick {
  friendNick: string;
}
export interface reciveMsgData {
  dmRoomId: number;
  from: string;
  message: string;
  timestamp: string;
}
export interface UserInfo {
  [key: number]: {
    socketId: string;
    nickname: string;
  };
}
export interface Msg {
  message: string;
  sender_id: number;
  timestamp: string;
}
export interface DmData {
  dmRoomId: number;
  chatUserInfo: UserInfo;
  prevChat: Msg[];
}
