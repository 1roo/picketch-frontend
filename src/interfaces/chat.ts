export interface ChatMessage {
  senderNick: string;
  message: string;
  timestamp?: string;
}

export interface GameChatMessage {
  senderNick: string;
  gameMessage: string;
}
