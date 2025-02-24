import styled from "styled-components";

// --------------page container---------
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// --------------CenterComponents----------------
export const CenterComponents = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #101010;
  padding: 20px;
  width: 80%;
  height: 93vh;
  margin: 0 auto;
`;

// -------------sketch components--------------
export const SketchbookContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-image: url(/images/sketchbook3.png);
  background-size: cover;
  display: flex;
  height: 70vh;
  width: 100%;
  min-height: 300px;
  padding-top: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PaletteDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const PaletteButton = styled.div<{
  selected: boolean;
  paletteColor: string;
}>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.paletteColor};
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid #000" : "1px solid #ccc")};
  transition: border 0.2s ease-in-out;
`;

// --------------userList --------------------
export const UserListContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 80vh;
  margin: 5% 10px;
  padding: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    display: none; /
  }
`;

// --------------userCard------------------------
export const UserCardContainer = styled.div`
  border: 2px solid #d8ff91;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ProfileImgContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8ff91;
  border-radius: 5px;
  margin-right: 5px;
  background-color: black;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    border: 1px solid #d8ff91;
    border-radius: 5px;
    margin: 2px 0;
    font-size: 0.9rem;
    text-align: center;
    padding: 3px;
    width: 100%;
  }

  @media (max-width: 768px) {
    span {
      font-size: 0.8rem;
      padding: 2px;
    }
  }
`;

// --------------chatting box-------------------

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 채팅 입력창이 항상 아래에 위치 */
  align-items: center;
  border-radius: 5px;
  width: 52.5vw;
  height: 20vh;
  max-height: calc(100vh - 150px); /* 화면 크기에 맞춰 자동 조정 */
  margin: 0 auto;
  border: 2px solid #d8ff91;
  background-color: rgba(217, 217, 217, 0.36);
  padding: 0 10px;

  @media (max-width: 1024px) {
    width: 65vw;
    height: 18vh;
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 16vh;
  }

  @media (max-width: 480px) {
    width: 90vw;
    height: 14vh;
  }
`;

export const InputDiv = styled.div`
  border: 1px solid #d8ff91;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.1); /* 배경색 조정 */
  border-radius: 5px;

  input {
    flex: 1;
    color: white;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 5px;
  }

  @media (max-width: 768px) {
    padding: 3px 8px;
    font-size: 0.9em;
  }
`;

export const ChatMessageWrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  max-height: calc(100% - 40px); /* 입력창 높이 제외한 영역 */

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.5);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(192, 192, 192, 0.5);
  }
`;

export const ChatBubble = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  padding: 5px;

  span {
    margin-left: 10px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px;
  }
`;
