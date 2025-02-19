import { useEffect, useState } from "react";
import styled from "styled-components";

interface TopComponentsProps {
  socket: any;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const RoomTitle = styled.span`
  font-weight: bold;
  font-size: 1.5em;
`;

const TimerDisplay = styled.div<{ $isRunning: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: #d8ff91;
`;

const ReadyButton = styled.button<{ $isReady: boolean }>`
  position: relative;
  width: 110px;
  height: 30px;
  background-color: ${(props) => (props.$isReady ? "#d8ff91" : "gray")};
  text-align: ${(props) => (props.$isReady ? "start" : "end")};
  color: ${(props) => (props.$isReady ? "#101010" : "#d8ff91")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    background: white;
    border-radius: 50%;
    top: 50%;
    left: ${(props) => (props.$isReady ? "calc(100% - 26px)" : "4px")};
    transform: translateY(-50%);
    transition: left 0.3s ease;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ExitButton = styled.span`
  cursor: pointer;
  color: red;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export default function TopComponents({ socket }: TopComponentsProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [readyPlayers, setReadyPlayers] = useState<number>(0);
  const totalPlayers = 4;

  useEffect(() => {
    const handleUpdateReady = (readyCount: number) => {
      setReadyPlayers(readyCount);
    };

    const handleStartTimer = () => {
      setIsRunning(true);
    };

    socket.on("update_ready", handleUpdateReady);
    socket.on("start_timer", handleStartTimer);

    return () => {
      socket.off("update_ready", handleUpdateReady);
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
    const newReadyState = !isReady;
    setIsReady(newReadyState);
    socket.emit("player_ready", newReadyState);
  };

  return (
    <Container>
      <RoomTitle>방제: 너가 그림을 그렇게 잘그려?</RoomTitle>
      <TimerDisplay $isRunning={isRunning}>{`${timeLeft}`}</TimerDisplay>
      <ReadyButton $isReady={isReady} onClick={handleReadyToggle}>
        READY
      </ReadyButton>
      <ExitButton>나가기</ExitButton>
    </Container>
  );
}
