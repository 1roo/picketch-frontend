import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as G from "../../styles/gameplayPage/gameplayPageStyle";
import { ChatMessage } from "../../interfaces/chat";

interface ChatBoxProps {
  socket: any;
}

export default function ChatBox({ socket }: ChatBoxProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("receive_message", (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message");
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
    if (inputMessage.trim() === "") return;

    const newMessage: ChatMessage = {
      userNick: "홍길동",
      message: inputMessage,
    };
    socket.emit("send_message", newMessage);
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
            <span className="nickname">{msg.userNick}</span>
            <span> {msg.message}</span>
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
