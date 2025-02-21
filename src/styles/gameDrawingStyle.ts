import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 80vh;
`;

export const SketchbookWrapper = styled.div`
  position: relative;
  width: 65vw;
  height: calc(65vw / 1.5);
  max-width: 900px;
  max-height: 600px;
  min-width: 300px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 90vw;
    height: calc(90vw / 1.5);
  }
`;

export const StyledStageContainer = styled.div`
  width: 100%; /* SketchbookWrapper와 동일하게 설정 */
  height: 100%; /* 비율 유지 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-image: url("/images/sketchbook3.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: width 0.3s ease, height 0.3s ease; /* 크기 변경 애니메이션 추가 */

  @media (max-width: 768px) {
    width: 95%;
    height: 85%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 90%;
  }
`;

export const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const ColorButton = styled.div<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.selected ? "3px solid #000" : "1px solid #ccc")};
`;

export const ClearButton = styled.button`
  margin-top: 10px;
  color: white;
  background-color: red;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: darkred;
  }
`;
