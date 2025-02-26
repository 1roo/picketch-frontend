import * as S from "../../styles/sideBar";
import {
  ChatMessage,
  DmData,
  FriendNick,
  Msg,
  reciveMsgData,
  UserInfo,
} from "../../interfaces/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import socket from "../../socket/dmChatSocket";

export default function DmChat({ friendNick }: FriendNick) {
  const userId = Number(localStorage.getItem("userId"));
  const [inputMessage, setInputMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [otherNick, setOtherNick] = useState(friendNick);
  const [myNick, setMyNick] = useState(userInfo[userId]?.nickname);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // 시간 가져오기
  const getCurrentTimestamp = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // 친구 선택 시 상대 닉네임 변경
  useEffect(() => {
    setOtherNick(friendNick);
    return () => {
      // 친구 변경 시 exitDm, 기존 친구와의 메세지 삭제
      socket.emit("exitDm", friendNick);
      setMessages([]);
    };
  }, [friendNick]);

  // myNick 가져오기
  useEffect(() => {
    setMyNick(userInfo[userId]?.nickname);
  }, [userInfo]);

  // 이전 대화내용,
  useEffect(() => {
    socket.on("error", (errmsg) => {
      alert(errmsg);
    });
    const updateHandler = (dmData: DmData) => {
      const { prevChat } = dmData;
      console.log(prevChat);
      setMessages((prevMessages) => [
        ...prevMessages,
        ...prevChat.map((msg: Msg) => ({
          senderNick: Number(msg.sender_id) === userId ? "me" : otherNick,
          message: msg.message,
          timestamp: msg.timestamp,
        })),
      ]);
      setUserInfo(dmData.chatUserInfo);
      setMyNick(userInfo[userId]?.nickname);
    };
    socket.on("updateDmRoomInfo", updateHandler);
    return () => {
      socket.off("updateDmRoomInfo", updateHandler);
    };
  }, [friendNick, messages]);

  // 메세지 보내기
  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    const newMessage: ChatMessage = {
      senderNick: myNick,
      message: inputMessage,
      timestamp: getCurrentTimestamp(),
    };
    console.log(newMessage);
    socket.emit("sendDm", newMessage);
    setInputMessage("");
  };
  const enterTodo = (e: React.KeyboardEvent) => {
    // 한글 두 번 추가 방지
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") sendMessage();
  };

  // 메세지 받기
  useEffect(() => {
    if (chatContainerRef.current) {
      const chatBox = chatContainerRef.current;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    const messageHandler = (data: reciveMsgData) => {
      const newMessage = [
        ...messages,
        {
          senderNick: data.from,
          message: data.message,
          timestamp: data.timestamp,
        },
      ];
      setMessages(newMessage);
    };
    socket.on("receiveDm", messageHandler);

    return () => {
      socket.off("receiveDm", messageHandler);
    };
  }, [messages]);

  return (
    <S.ChatDiv>
      <S.FriendNick>{otherNick}</S.FriendNick>
      <S.ChatContainer ref={chatContainerRef}>
        {messages.map((msg, index) => {
          const isMyMessage =
            msg.senderNick === myNick || msg.senderNick === "me"; // ✅ 변수로 선언하여 가독성 향상

          return (
            <S.ChatMessageWrapper
              key={`${msg.timestamp}-${index}`}
              isMyMessage={isMyMessage}
            >
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
          type="text"
          placeholder="채팅 입력"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={enterTodo}
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
