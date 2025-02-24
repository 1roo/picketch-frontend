export interface GameRoom {
  id: number;
  roomName: string; // 방 제목
  isPrivate: boolean; // 비밀방 여부
  playerCount: number; // 플레이어 수
}
