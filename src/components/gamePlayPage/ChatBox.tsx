import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import * as G from '../../styles/gameplayPage/gameplayPageStyle';
import { GameChatMessage } from '../../interfaces/chat';

interface ChatBoxProps {
  socket: any;
}

export default function ChatBox({ socket }: ChatBoxProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<GameChatMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    const messageHandler = (newMessage: GameChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('gameMessage', messageHandler);

    return () => {
      socket.off('gameMessage', messageHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current!.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '' || !socket) return;

    const newMessage: GameChatMessage = {
      senderNick: '홍길동',
      gameMessage: inputMessage,
    };

    socket.emit('gameMessage', newMessage); // ✅ 메시지만 보냄, 상태 업데이트 X
    setInputMessage(''); // 입력 필드 초기화
  };

  return (
    <G.ChatContainer>
      <G.ChatMessageWrapper>
        {messages.map((msg, index) => (
          <G.ChatBubble
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <span className='nickname'>{msg.senderNick}</span>
            <span> {msg.gameMessage}</span>
          </G.ChatBubble>
        ))}
      </G.ChatMessageWrapper>
      <G.InputDiv>
        <input
          type='text'
          placeholder='채팅 입력'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
              e.preventDefault(); // Enter 키의 기본 동작을 막습니다.
            }
          }}
        />
        <FontAwesomeIcon icon={faCircleArrowUp} onClick={sendMessage} />
      </G.InputDiv>
    </G.ChatContainer>
  );
}
