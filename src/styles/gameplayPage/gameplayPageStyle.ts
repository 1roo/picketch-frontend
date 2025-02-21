import styled from "styled-components";

// --------------page container---------
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid tomato;
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
  border: 1px solid violet;
`;

// -------------sketch components--------------
export const SketchbookContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-image: url(/images/sketchbook.png);
  background-size: cover;
  display: flex;
  height: 70vh;
  width: 100%;
  min-height: 300px;
  padding-top: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid pink;
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
  padding: 3px;
`;

export const ProfileImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8ff91;
  border-radius: 5px;
  margin-right: 5px;
`;

export const UserInfo = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  span {
    border: 1px solid #d8ff91;
    border-radius: 5px;
    margin: 2px 0;
    font-size: 0.8em;
  }
`;

// --------------chatting box-------------------

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 5px;
  width: 52.5vw;
  height: 18vh;
  max-height: 150px;
  margin: 0 auto;
  border: 2px solid #d8ff91;
  background-color: rgba(217, 217, 217, 0.36);
  padding: 0 10px;

  span {
    color: white;
  }
  .nickname {
    max-width: 80px;
    font-size: 1.1em;
    padding-right: 10px;
  }
`;

export const InputDiv = styled.div`
  position: absolute;
  bottom: 3vh;
  border: 1px solid #d8ff91;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 51vw;
  padding: 0 10px;

  input {
    width: 96%;
    color: white;
  }
`;

export const ChatMessageWrapper = styled.div`
  width: 100%;
  height: 80%;
  margin: 5px 0;
  overflow-y: scroll;
  margin-bottom: 30px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
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
  font-size: 13px;

  span {
    margin-left: 10px;
    font-size: 13px;
  }
`;
