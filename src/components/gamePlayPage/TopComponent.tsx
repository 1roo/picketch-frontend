import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface TopComponentsProps {
  socket: any;
  gameTitle: string;
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
`;

const ReadyButton = styled.button<{ $isReady: boolean }>`
  width: 90px;
  height: 32px;
  background-color: ${(props) => (props.$isReady ? "#d8ff91" : "gray")};
  color: ${(props) => (props.$isReady ? "#101010" : "#d8ff91")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
`;

const ExitButton = styled.span`
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1em;
  transition: color 0.3s ease;
  &:hover {
    color: #d8ff91;
  }
`;

export default function TopComponents({
  socket,
  gameTitle,
}: TopComponentsProps) {
  const [isReady, setIsReady] = useState(false);
  const [managerId, setManagerId] = useState<number | null>(null);
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const exitGame = () => {
    socket.emit("leaveGame");
    navigate("/game-list-page");
  };

  useEffect(() => {
    socket.on("updateGameInfo", (response: { data: { managerId: number } }) => {
      setManagerId(response.data.managerId);
    });

    return () => {
      socket.off("updateGameInfo");
    };
  }, [socket]);

  return (
    <Container>
      <RoomTitle>{gameTitle || ""}</RoomTitle>
      <ReadyButton $isReady={isReady} onClick={() => setIsReady(!isReady)}>
        {userId === managerId ? "START" : "READY"}
      </ReadyButton>
      <ExitButton onClick={exitGame}>나가기</ExitButton>
    </Container>
  );
}
