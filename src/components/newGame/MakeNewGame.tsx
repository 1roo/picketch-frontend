import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function MakeNewGame() {
  const [isLocked, setIsLocked] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [turns, setTurns] = useState<number>(1);
  const [password, setPassword] = useState("");

  const handleLockChange = () => {
    setIsLocked((prev) => !prev);
    if (!isLocked) setPassword("");
  };

  const handleCreateGame = async () => {
    const gameData = {
      roomName,
      round: turns,
      isLock: isLocked,
      password: isLocked ? password : null,
    };

    try {
      const response = await axios.post("/api/game-room", gameData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("방 생성 성공:", response.data);
      alert("방이 생성되었습니다!");
    } catch (error) {
      console.error("방 생성 오류:", error);
      alert("방 생성에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <p>방 생성</p>
        <InputWrapper>
          <span>방 제목</span>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper style={{ display: "flex" }}>
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
        <InputWrapper>
          <span>잠금</span>
          <img
            src={isLocked ? "/images/lock.png" : "/images/lock2.png"}
            alt="자물쇠 그림"
            style={{ height: "25px" }}
          />
          <input
            type="checkbox"
            checked={isLocked}
            onChange={handleLockChange}
          />
          <span style={{ marginLeft: "10px" }}>비밀번호</span>
          <input
            type="number"
            value={password}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/\D/g, "");
              if (inputValue.length <= 4) {
                setPassword(inputValue);
              }
            }}
            style={{ width: "45%" }}
            disabled={!isLocked}
          />
        </InputWrapper>
        <BtnDiv>
          <Button type="make" onClick={handleCreateGame}>
            생성
          </Button>
          <Button type="cancel">취소</Button>
        </BtnDiv>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center; /* 세로 중앙 */
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

  input {
    border: 1px solid #101010;
    border-radius: 5px;
  }

  p {
    font-weight: 700;
    font-size: 1.2em;
    margin-left: -20px;
    margin-top: -50px;
    margin-bottom: 25px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 10px 0;

  input {
    border: 1px solid #101010;
    border-radius: 5px;
    padding: 3px;

    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

const Radios = styled.div`
  border: 1px solid #101010;
  border-radius: 5px;
  width: 75%;
  display: flex;
  justify-content: space-around;
  padding: 3px 0;

  input {
    margin-right: 5px;
  }
`;

const BtnDiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Button = styled.button<{ type: "make" | "cancel" }>`
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  color: #d8ff91;
  margin: 0 5px;
  background-color: ${({ type }) => (type === "make" ? "#101010" : "#BDBDBD")};

  &:hover {
    background-color: ${({ type }) =>
      type === "make" ? "#2E2E2E" : "#9E9E9E"};
  }
`;
