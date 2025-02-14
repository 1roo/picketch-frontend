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
  margin-top: 10px;
`;

export const ChatContainer = styled.div`
  position: absolute;
  left: 0;
  top: 40px;
  width: 360px;
  height: 50vh;
  border: 1px solid #d8ff91;
  background-color: #101010;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  padding: 10px;
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
  position: absolute;
  width: 330px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
