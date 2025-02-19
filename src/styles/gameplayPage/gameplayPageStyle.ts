import styled from "styled-components";

// -------------sketch components--------------
export const SketchbookContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-image: url(/images/sketchbook.png);
  background-size: cover;
  display: flex;
  height: 70vh;
  width: 70%;
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
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.paletteColor};
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.selected ? "3px solid #000" : "1px solid #ccc")};
  transition: border 0.2s ease-in-out;
`;

// --------------chatting box-------------------

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 5px;
  width: 644px;
  height: 150px;
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
  bottom: 30px;
  border: 1px solid #d8ff91;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 620px;
  padding: 0 10px;

  input {
    width: 95%;
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
