import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as G from "../../styles/gameplayPage/gameplayPageStyle";
import { GameChatMessage } from "../../interfaces/chat";

interface ChatBoxProps {
  socket: any;
}

export default function ChatBox({ socket }: ChatBoxProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<GameChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return; // socket이 null이면 실행하지 않음

    const messageHandler = (newMessage: GameChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("gameMessage", messageHandler);

    return () => {
      if (socket) {
        socket.off("gameMessage", messageHandler);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current!.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === "" || !socket) return;

    const newMessage: GameChatMessage = {
      senderNick: "홍길동",
      gameMessage: inputMessage,
    };

    socket.emit("gameMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
  };

  return (
    <G.ChatContainer>
      <G.ChatMessageWrapper>
        {messages.map((msg, index) => (
          <G.ChatBubble
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}>
            <span className="nickname">{msg.senderNick}</span>
            <span> {msg.gameMessage}</span>
          </G.ChatBubble>
        ))}
      </G.ChatMessageWrapper>
      <G.InputDiv>
        <input
          type="text"
          placeholder="채팅 입력"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <FontAwesomeIcon icon={faCircleArrowUp} onClick={sendMessage} />
      </G.InputDiv>
    </G.ChatContainer>
  );
}
