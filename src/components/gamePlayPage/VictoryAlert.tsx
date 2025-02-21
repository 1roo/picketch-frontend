import React from "react";
import styled, { keyframes } from "styled-components";
import Lottie from "lottie-react";
import animationData from "../../assets/victory.json";

const crownImg = "/images/crown.png";

interface VictoryAlertProps {
  username: string;
  profileImg: string;
  onPlayAgain: () => void;
  onGoToGameList: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.5s ease-in-out;
  overflow: hidden;
`;

const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 5;
`;

const VictoryContainer = styled.div`
  background: #2c3e50;
  color: #fff;
  padding: 80px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Winner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f1c40f;
`;

const Crown = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #f1c40f;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #d4af37;
  }
`;

const VictoryAlert: React.FC<VictoryAlertProps> = ({
  username,
  profileImg,
  onPlayAgain,
  onGoToGameList,
}) => {
  return (
    <>
      <FireworksContainer>
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100vw", height: "100vh" }}
        />
      </FireworksContainer>
      <Background>
        <VictoryContainer>
          <Crown src={crownImg} alt="Crown" />
          <Title> Winner</Title>
          <Winner>
            <ProfileImage src={profileImg} alt="Profile" />
            {username}
          </Winner>
          <ButtonContainer>
            <Button onClick={onPlayAgain}>한 판 더!</Button>
            <Button onClick={onGoToGameList}>게임 리스트로</Button>
          </ButtonContainer>
        </VictoryContainer>
      </Background>
    </>
  );
};

export default VictoryAlert;
