import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 100vh;
  border-right: 3px solid #d8ff91;
  @media (max-width: 1024px) {
    width: 300px;
  }

  @media (max-width: 900px) {
    width: 250px;
  }

  @media (max-width: 800px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AlertDiv = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  right: -310px;
  top: 10px;
  padding: 10px;
  background-color: #101010;
  border: 1px solid #d8ff91;
  border-radius: 5px;
  z-index: 9999;

  &::after {
    content: "";
    position: absolute;
    top: 18px;
    right: 99%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 10px 18px 10px 0;
    border-style: solid;
    border-color: transparent #101010 transparent transparent;
  }

  &::before {
    content: "";
    position: absolute;
    top: 18px;
    right: 99%;
    transform: translateY(-50%) translateX(-3px);
    width: 0;
    height: 0;
    border-width: 9px 18px 9px 0;
    border-style: solid;
    border-color: transparent #d8ff91 transparent transparent;
  }
`;

export const Line = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 3px;
  width: 360px;
  background-color: #d8ff91;
  border-radius: 5px;
  @media (max-width: 1024px) {
    width: 300px;
  }

  @media (max-width: 900px) {
    width: 250px;
  }

  @media (max-width: 800px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

//----------rank--------------

export const RankDiv = styled.div`
  position: relative;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: normal;
  height: 35%;
  p {
    font-weight: bold;
    font-size: 23px;
  }
`;

export const RankContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #101010;
  border: 2px solid #d8ff91;
  border-radius: 5px;
  margin: 50px auto 0;
  padding: 20px;
  width: 300px;
`;

export const RankItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  span {
    margin: 10px 0 20px;
  }
  b {
    color: #d8ff91;
  }
`;

export const TriangleWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 100px;
`;

export const CylinderBase = styled.div`
  width: 40px;
  height: 100px;
  background: #d8d8d8;
  border-radius: 20px 20px 0 0;
  position: relative;
  overflow: hidden;
`;

export const CylinderFill = styled.div<{ fillPercentage: number }>`
  width: 40px;
  height: ${(props) => props.fillPercentage}%;
  background: #ff6666;
  border-radius: 20px 20px 0 0;
  position: absolute;
  bottom: 0;
`;

// ---------------------Friends-----------------------------------

export const FriendsDiv = styled.div`
  position: relative;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: normal;
  height: 35%; /* 기존 height 유지 */
  overflow-y: auto; /* 스크롤 활성화 */

  div {
    margin: 10px 0;
  }
  @media (max-width: 900px) {
    padding: 8px 15px;
  }

  @media (max-width: 800px) {
    padding: 5px 10px;
  }
`;

export const FrindDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;

  font-size: clamp(12px, 1.8vw, 16px);

  button {
    margin: 0 10px;
    padding: 3px 10px;
    color: #d8ff91;
    border: 2px solid #d8ff91;
    border-radius: 10px;
    font-size: inherit;
  }

  button:hover {
    background-color: #d8ff91;
    color: #101010;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    button {
      padding: 3px 8px;
    }
  }

  @media (max-width: 800px) {
    font-size: 13px;
    button {
      padding: 2px 6px;
    }
  }

  @media (max-width: 600px) {
    font-size: 12px;
    justify-content: center;
    button {
      margin: 5px 0;
      padding: 2px 5px;
    }
  }
`;

// ---------------------chatting-----------------------------------

export const FriendNick = styled.div`
  background: #101010;
  border-bottom: 1px solid #d8ff91;
`;

export const CloseButton = styled.button`
  background-color: #d8ff91;
  color: black;
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 5px;
`;

export const ChatDiv = styled.div`
  border: 1px solid #d8ff91;
  background-color: #101010;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 10px;
  width: 360px;
  height: 52.5vh;
`;

export const ChatContainer = styled.div`
  position: absolute;
  left: 0;
  top: 45px;
  width: 358px;
  height: 78%;
  background-color: #101010;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.11);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(136, 136, 136, 0.5);
  }
`;

export const ChatMessageWrapper = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isMyMessage",
})<{ isMyMessage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isMyMessage }) =>
    isMyMessage ? "flex-end" : "flex-start"};
  margin: 5px 0;
`;

export const ChatBubble = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "isMyMessage",
})<{ isMyMessage: boolean }>`
  max-width: 60%;
  padding: 5px;
  border-radius: 10px;
  color: ${({ isMyMessage }) => (isMyMessage ? "#101010" : "#d8ff91")};
  border: ${({ isMyMessage }) => (isMyMessage ? "none" : "1px solid #d8ff91")};
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? "#d8ff91" : "#101010"};
  text-align: ${({ isMyMessage }) => (isMyMessage ? "right" : "left")};
`;

export const Timestamp = styled("span").withConfig({
  shouldForwardProp: (prop) => prop !== "isMyMessage",
})<{ isMyMessage: boolean }>`
  font-size: 12px;
  color: #aaa;
  margin: 0 10px;
  order: ${({ isMyMessage }) => (isMyMessage ? "-1" : "1")};
`;

export const ChatInput = styled.input`
  border: 1px solid #d8ff91;
  border-radius: 5px;
  width: 300px;
  padding: 5px;
  color: #d8ff91;
`;

export const ChatInputBox = styled.div`
  position: fixed;
  width: 330px;
  top: 48vh;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// --------------- Alert ----------------

export const NoticeAlert = styled.p`
  text-align: center;
  font-size: 25px;
  height: 15%;
  font-weight: 100;
  /* color: black;
  background-color: #d8ff91; */
`;

export const NoneRead = styled.p`
  text-align: center;
  font-size: 13px;
  height: 8%;
  background-color: gray;
`;

export const AlertContainer = styled.div`
  width: 100%;
  height: 40%;
  border: 1px solid #d8ff91;
  margin-top: 10px;
  /* background-color: rgb(133, 117, 117); */
`;
export const TypeBox = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
`;
export const GameType = styled.p`
  text-align: center;
  font-size: 13px;
  width: 70%;
  height: 8%;
  text-align: start;
  padding: 3px 0 0 8px;
`;

export const SendTime = styled.p`
  text-align: center;
  font-size: 13px;
  width: 30%;
  height: 8%;
  font-size: 10px;
  text-align: end;
  padding: 5px 8px 0 0;
`;

export const RequestContent = styled.p`
  text-align: center;
  font-size: 20px;
  width: 100%;
  height: 40%;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 20%;
`;

export const AcceptButton = styled.button`
  width: 25%;
  height: 100%;
  border-radius: 10px;
  text-align: center;
  font-size: 13px;
  background-color: blue;
`;
export const RejectButton = styled.button`
  width: 25%;
  height: 100%;
  border-radius: 10px;
  text-align: center;
  font-size: 13px;
  background-color: red;
`;
