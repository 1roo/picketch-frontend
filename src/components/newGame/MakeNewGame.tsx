import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";
import api from "../../utils/axios";

interface MakeNewGameProps {
  onClose: () => void;
}

export default function MakeNewGame({ onClose }: MakeNewGameProps) {
  const [roomName, setRoomName] = useState("");
  const [turns, setTurns] = useState<number>(1);
  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleLockChange = () => {
    setIsLocked((prev) => !prev);
    if (!isLocked) setPassword("");
  };

  const handleCreateGame = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    // 백엔드에서 요구하는 필드명으로 수정 (예: gameName, is_lock, password, round)
    const gameData = {
      roomName,
      round: turns,
      is_lock: isLocked,
      password: isLocked ? password : null,
    };
    try {
      // 방 생성 요청
      const response = await api.post(`/api/game-room`, gameData);
      const newGameId = response.data.data?.gameId;
if(response.data.code==='SU'){
  navigate(`/game-page/${newGameId}`);
}
      if (!newGameId) {
        alert("방 생성 실패: gameId를 받지 못했습니다.");
        return;
      }

      localStorage.setItem('manager', 'true');
      console.log("✅ 방 생성 성공, gameId:", newGameId);

      // 생성된 방에 자동 입장 (POST /api/game-room/join)
      const joinResponse = await api.post(`/api/game-room/join`, {
        gameId: newGameId,
        inputPw: password || "",
      });

      if (joinResponse.data.code !== "SU") {
        alert(`방 입장 실패: ${joinResponse.data.message}`);
        return;
      }

      console.log("✅ 방 입장 성공, 소켓 연결 시도");


      
        


      
    } catch (error) {
      console.error("❌ 방 생성 오류:", error);
      alert("방 생성에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>방 생성</Title>

        {/* 방 제목 */}
        <InputWrapper>
          <span>방 제목</span>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputWrapper>

        {/* 턴 수 선택 */}
        <InputWrapper>
          <span>턴 수</span>
          <Radios>
            {[1, 2, 3, 4].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="turns"
                  value={num}
                  checked={turns === num}
                  onChange={() => setTurns(num)}
                />
                {num}
              </label>
            ))}
          </Radios>
        </InputWrapper>

        {/* 잠금 기능 & 비밀번호 입력 */}
        <LockInputWrapper>
          <span>잠금</span>
          <LockContainer>
            <LockGroup>
              <LockIcon
                src={isLocked ? "/images/lock.png" : "/images/lock2.png"}
                alt="자물쇠 그림"
              />
              <LockCheckBox
                type="checkbox"
                checked={isLocked}
                onChange={handleLockChange}
              />
            </LockGroup>
            <PasswordContainer>
              <span>비밀번호</span>
              <PasswordInput
                type="number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isLocked}
              />
            </PasswordContainer>
          </LockContainer>
        </LockInputWrapper>

        {/* 버튼 */}
        <ButtonContainer>
          <Button type="make" onClick={handleCreateGame}>
            생성
          </Button>
          <Button type="cancel" onClick={onClose}>
            취소
          </Button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

/* ======= Styled Components ======= */

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(21, 21, 21, 0.5);
`;

const Container = styled.div`
  position: relative;
  width: 50vw;
  max-width: 450px;
  height: 35vh;
  min-height: 300px;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d8ff91;
  border-radius: 5px;
  color: #101010;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 1.2em;
  margin-bottom: 25px;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;

  input {
    border: 1px solid #101010;
    border-radius: 5px;
    padding: 3px;
  }
`;

const LockInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
`;

const LockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 10px;
`;

const LockGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LockIcon = styled.img`
  height: 23px;
`;

const LockCheckBox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PasswordInput = styled.input`
  width: 130px;
  padding: 6px;
  border: 1px solid #101010;
  border-radius: 5px;
`;

const Radios = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #101010;
  border-radius: 5px;
  width: 75%;
  padding: 5px 0;

  input {
    margin-right: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ type: "make" | "cancel" }>`
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  color: #d8ff91;
  background-color: ${({ type }) => (type === "make" ? "#101010" : "#BDBDBD")};

  &:hover {
    background-color: ${({ type }) =>
      type === "make" ? "#2E2E2E" : "#9E9E9E"};
  }
`;
