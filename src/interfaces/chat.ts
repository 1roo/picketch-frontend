export interface ChatMessage {
  senderNick: string;
  message: string;
  timestamp?: string;
  isRead: boolean;
}
export interface FriendNick {
  friendNick: string;
}
export interface reciveMsgData {
  dmRoomId: number;
  from: string;
  message: string;
  timestamp: string;
  isRead: boolean;
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
  isRead: boolean;
}
export interface DmData {
  dmRoomId: number;
  chatUserInfo: UserInfo;
  prevChat: Msg[];
}

export interface GameChatMessage {
  senderNick: string;
  gameMessage: string;
}
