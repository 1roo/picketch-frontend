import * as S from "../../styles/sideBar";
import { ChatMessage } from "../../interfaces/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DmChat() {
  const [inputMessage, setInputMessage] = useState("");
  const myNick = "홍길동";
  const otherNick = "친구nick";

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, userNick: "야야", message: "안녕!", timestamp: "02월 14일 14:00" },
    {
      id: 2,
      userNick: myNick,
      message: "반가워!",
      timestamp: "02월 14일 14:01",
    },
    {
      id: 3,
      userNick: "야야",
      message: "DM 테스트 중이야",
      timestamp: "02월 14일 14:02",
    },
    {
      id: 4,
      userNick: myNick,
      message: "잘 나오네!",
      timestamp: "02월 14일 14:03",
    },
    { id: 5, userNick: "야야", message: "좋아!", timestamp: "02월 14일 14:04" },
  ]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // ✅ 메시지 전송 함수 (엔터 키 or 버튼 클릭 시 실행)
  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      userNick: myNick,
      message: inputMessage,
      timestamp: getCurrentTimestamp(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  return (
    <>
      <S.FriendNick>{otherNick}</S.FriendNick>
      <S.ChatContainer>
        {messages.map((msg) => (
          <S.ChatMessageWrapper
            key={msg.id}
            isMyMessage={msg.userNick === myNick}>
            <S.ChatBubble isMyMessage={msg.userNick === myNick}>
              <span>{msg.message}</span>
            </S.ChatBubble>
            <S.Timestamp isMyMessage={msg.userNick === myNick}>
              {msg.timestamp}
            </S.Timestamp>
          </S.ChatMessageWrapper>
        ))}

        <S.ChatInputBox>
          <S.ChatInput
            type="text"
            placeholder="채팅 입력"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{ cursor: "pointer" }}
            onClick={sendMessage}
          />
        </S.ChatInputBox>
      </S.ChatContainer>
    </>
  );
}
