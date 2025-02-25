import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import socket from "../../socket/gameSocket"; // ✅ 소켓 가져오기
import api from "../../utils/axios";

interface MakeNewGameProps {
  onClose: () => void;
}

export default function MakeNewGame({ onClose }: MakeNewGameProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [turns, setTurns] = useState<number>(1);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLockChange = () => {
    setIsLocked((prev) => !prev);
    if (!isLocked) setPassword("");
  };

  const handleCreateGame = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const gameData = {
      roomName,
      round: turns,
      isLock: isLocked,
      pw: isLocked ? password : null,
    };

    try {
      const response = await api.post(`/api/game-room`, gameData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newGameId = response.data.gameId;
      console.log("방 생성 성공:", response.data);
      alert("방이 생성되었습니다!");

      // ✅ 방장이 자동으로 게임방 입장
      socket.emit("joinGame", {
        userId,
        gameId: newGameId,
        inputPw: password || "",
      });

      socket.on("joinGame", (joinResponse) => {
        if (joinResponse.type === "SUCCESS") {
          navigate(`/game-page/${newGameId}`, {
            state: joinResponse.data,
          });
        } else {
          alert(`방 입장 실패: ${joinResponse.message}`);
        }
      });

      // ✅ 방 생성 후 모달 닫기
      onClose();
    } catch (error) {
      console.error("방 생성 오류:", error);
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

/* 전체 화면을 감싸는 배경 */
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(21, 21, 21, 0.5);
`;

/* 방 생성 UI 컨테이너 */
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

/* 제목 스타일 */
const Title = styled.p`
  font-weight: 700;
  font-size: 1.2em;
  margin-bottom: 25px;
  text-align: center;
`;

/* 공통 Input 박스 */
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

  input {
    border: 1px solid #101010;
    border-radius: 5px;
    padding: 3px;
  }
`;

/* 잠금 & 비밀번호 그룹 */
const LockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 10px;
`;

/* 자물쇠 아이콘 & 체크박스 */
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

/* 비밀번호 입력 필드 */
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

/* 턴 수 선택 영역 */
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

/* 버튼 컨테이너 */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

/* 버튼 스타일 */
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
