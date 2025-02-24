import { useEffect, useState } from "react";
import styled from "styled-components";

interface TopComponentsProps {
  socket: any;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  padding: 10px;
  background-color: #101010;
  border-radius: 10px;
  flex-wrap: nowrap;
  gap: 5px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 8px;
    gap: 3px;
  }

  @media (max-width: 540px) {
    width: 95%;
    padding: 5px;
    gap: 2px;
    flex-wrap: wrap; /* ✅ 좁아지면 두 줄 배치 */
    justify-content: center;
  }
`;

const RoomTitle = styled.span`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #d8ff91;
  min-width: 140px;
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1em;
    max-width: 55%;
  }

  @media (max-width: 540px) {
    font-size: 0.8em;
    max-width: 60%;
  }

  @media (max-width: 400px) {
    font-size: 0.7em;
    max-width: 65%;
  }
`;

const TimerDisplay = styled.div<{ $isRunning: boolean }>`
  font-size: 1.2em;
  font-weight: bold;
  color: ${(props) => (props.$isRunning ? "#d8ff91" : "#ccc")};
  min-width: 40px;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 540px) {
    font-size: 0.8em;
    min-width: 30px;
  }
`;

const ReadyButton = styled.button<{ $isReady: boolean }>`
  width: 90px;
  height: 32px;
  background-color: ${(props) => (props.$isReady ? "#d8ff91" : "gray")};
  color: ${(props) => (props.$isReady ? "#101010" : "#d8ff91")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 75px;
    height: 28px;
    font-size: 0.8em;
  }

  @media (max-width: 540px) {
    width: 65px;
    height: 25px;
    font-size: 0.7em;
  }
`;

const ExitButton = styled.span`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  transition: color 0.3s ease;
  min-width: 50px;

  &:hover {
    color: #d8ff91;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    min-width: 40px;
  }

  @media (max-width: 540px) {
    font-size: 0.8em;
    min-width: 35px;
  }
`;

export default function TopComponents({ socket }: TopComponentsProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleStartTimer = () => {
      setIsRunning(true);
    };

    socket.on("start_timer", handleStartTimer);

    return () => {
      socket.off("start_timer", handleStartTimer);
    };
  }, [socket]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setTimeLeft(60);
          socket.emit("reset_ready");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, socket]);

  const handleReadyToggle = () => {
    setIsReady(!isReady);
    socket.emit("player_ready", !isReady);
  };

  return (
    <Container>
      <RoomTitle>방제: 너가 그림을 그렇게 잘 그려?</RoomTitle>
      <TimerDisplay $isRunning={isRunning}>{`${timeLeft} `}초</TimerDisplay>
      <ReadyButton $isReady={isReady} onClick={handleReadyToggle}>
        READY
      </ReadyButton>
      <ExitButton>나가기</ExitButton>
    </Container>
  );
}
