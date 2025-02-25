import * as S from "../../styles/sideBar";
import { ChatMessage } from "../../interfaces/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function DmChat() {
  const [inputMessage, setInputMessage] = useState("");
  const myNick = "홍길동";
  const otherNick = "친구nick";

  const [messages, setMessages] = useState<ChatMessage[]>([
    { userNick: "야야", message: "안녕!", timestamp: "02월 14일 14:00" },
    {
      userNick: myNick,
      message: "반가워!",
      timestamp: "02월 14일 14:01",
    },
    {
      userNick: "야야",
      message: "DM 테스트 중이야",
      timestamp: "02월 14일 14:02",
    },
    {
      userNick: myNick,
      message: "잘 나오네!",
      timestamp: "02월 14일 14:03",
    },
    { userNick: "야야", message: "좋아!", timestamp: "02월 14일 14:04" },
  ]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // input 요소를 참조하는 useRef

  const getCurrentTimestamp = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: ChatMessage = {
      userNick: myNick,
      message: inputMessage,
      timestamp: getCurrentTimestamp(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    if (inputRef.current) {
      inputRef.current.focus(); // input 창에 포커스 유지
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatBox = chatContainerRef.current;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <S.ChatDiv>
      <S.FriendNick>{otherNick}</S.FriendNick>
      <S.ChatContainer ref={chatContainerRef}>
        {messages.map((msg) => {
          const isMyMessage = msg.userNick === myNick; // ✅ 변수로 선언하여 가독성 향상

          return (
            <S.ChatMessageWrapper key={msg.userNick} isMyMessage={isMyMessage}>
              <S.ChatBubble isMyMessage={isMyMessage}>
                <span>{msg.message}</span>
              </S.ChatBubble>
              <S.Timestamp isMyMessage={isMyMessage}>
                {msg.timestamp}
              </S.Timestamp>
            </S.ChatMessageWrapper>
          );
        })}
      </S.ChatContainer>

      <S.ChatInputBox>
        <S.ChatInput
          ref={inputRef}
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
    </S.ChatDiv>
  );
}
