import styled from "styled-components";

export const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 20px;
  height: 100vh;
  width: 100%;
`;

export const GameRoomsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 90%;
  max-width: 800px;
  margin: 20px auto 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
