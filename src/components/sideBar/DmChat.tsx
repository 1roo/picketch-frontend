import * as S from '../../styles/sideBar';
import { ChatMessage } from '../../interfaces/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

import socket from '../../socket/dmChatSocket';

interface FriendProps {
  friendNick: string;
}
interface MsgData {
  dmRoomId: number;
  from: string;
  message: string;
}
export default function DmChat({ friendNick }: FriendProps) {
  console.log(friendNick);
  const [inputMessage, setInputMessage] = useState('');
  const myNick = '홍길동';
  const otherNick = friendNick;
  const [dmRoomId, setDmRoomId] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const [messages, setMessages] = useState<ChatMessage[]>([
    { senderNick: otherNick, message: '안녕!', timestamp: '02월 14일 14:00' },
    {
      senderNick: myNick,
      message: '반가워!',
      timestamp: '02월 14일 14:01',
    },
    {
      senderNick: otherNick,
      message: 'DM 테스트 중이야',
      timestamp: '02월 14일 14:02',
    },
    {
      senderNick: myNick,
      message: '잘 나오네!',
      timestamp: '02월 14일 14:03',
    },
    { senderNick: otherNick, message: '좋아!', timestamp: '02월 14일 14:04' },
  ]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // input 요소를 참조하는 useRef

  const getCurrentTimestamp = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };
  // const getMessage = () => {
  //   const newMessage: ChatMessage = {
  //     senderNick: myNick,
  //     message: inputMessage,
  //     timestamp: getCurrentTimestamp(),
  //   };
  //   setMessages((prevMessages) => [...prevMessages, newMessage]);
  // };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: ChatMessage = {
      senderNick: myNick,
      message: inputMessage,
      timestamp: getCurrentTimestamp(),
    };
    socket.emit('sendDm', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    if (inputRef.current) {
      inputRef.current.focus(); // input 창에 포커스 유지
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatBox = chatContainerRef.current;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    // 추가
    const messageHandler = (data: MsgData) => {
      const newMessage = [
        ...messages,
        {
          senderNick: data.from,
          message: data.message,
          timestamp: getCurrentTimestamp(),
        },
      ];
    };
    socket.on('receiveDm', messageHandler);

    return () => {
      socket.off('receiveDm', messageHandler);
    };
  }, [messages]);

  useEffect(() => {
    socket.on('error', (errmsg) => {
      alert(errmsg);
    });

    socket.on('updateDmRoomInfo', (dmData) => {
      console.log(dmData.prevChat);
      setMessages(dmData.prevChat);
      setDmRoomId(dmData.dmRoomId);
      setUserInfo(dmData.chatUserInfo);
    });
  }, []);

  return (
    <S.ChatDiv>
      <S.FriendNick>{otherNick}</S.FriendNick>
      <S.ChatContainer ref={chatContainerRef}>
        {messages.map((msg) => {
          const isMyMessage = msg.senderNick === myNick; // ✅ 변수로 선언하여 가독성 향상

          return (
            <S.ChatMessageWrapper
              key={msg.senderNick}
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
          ref={inputRef}
          type='text'
          placeholder='채팅 입력'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          style={{ cursor: 'pointer' }}
          onClick={sendMessage}
        />
      </S.ChatInputBox>
    </S.ChatDiv>
  );
}
