import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 100vh;
  border-right: 3px solid #d8ff91;
`;

export const AlertDiv = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  right: -290px;
  top: 10px;
  padding: 10px;
  background-color: #101010;
  border: 1px solid #d8ff91;
  border-radius: 5px;
`;

export const FriendsDiv = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: normal;
  p {
    font-weight: bold;
    font-size: 23px;
  }

  div {
    margin: 10px 0;
  }
`;

export const FrindDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin: 0 15px;
    padding: 3px 10px;
    color: #d8ff91;
    border: 2px solid #d8ff91;
    border-radius: 10px;
  }

  button:hover {
    background-color: #d8ff91;
    color: #101010;
    font-weight: bold;
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
`;

export const RankDiv = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
  p {
    font-weight: bold;
    font-size: 23px;
  }
`;

// ---------------------chatting-----------------------------------

export const FriendNick = styled.div`
  background: #101010;
  border-bottom: 1px solid #d8ff91;
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

export const ChatMessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isMyMessage }) =>
    isMyMessage ? "flex-end" : "flex-start"};
  margin: 5px 0;
`;

export const ChatBubble = styled.div<{ isMyMessage: boolean }>`
  max-width: 60%;
  padding: 5px;
  border-radius: 10px;
  color: ${({ isMyMessage }) => (isMyMessage ? "#101010" : "#d8ff91")};
  border: ${({ isMyMessage }) => (isMyMessage ? "none" : "1px solid #d8ff91")};
  background-color: ${({ isMyMessage }) =>
    isMyMessage ? "#d8ff91" : "#101010"};
  text-align: ${({ isMyMessage }) => (isMyMessage ? "right" : "left")};
`;

export const Timestamp = styled.span<{ isMyMessage: boolean }>`
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
  top: 385px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
