import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #101010;
  color: #d8ff91;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  flex: 1;

  @media (max-width: 1024px) {
    padding-left: 20px;
  }

  @media (max-width: 800px) {
    padding-left: 10px;
  }

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 650px;
  padding: clamp(10px, 3vw, 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease-in-out;
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 70px;
  border-radius: 5px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 100px;
  }
`;

export const CharacterSelectorContainer = styled.div`
  width: 100%;
  max-width: 500px;
  border: 2px solid #d8ff91;
  padding: clamp(10px, 3vw, 20px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(5px, 3vw, 20px);
  justify-content: center;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;

  @media (max-width: 1024px) {
    padding: 15px;
    gap: 15px;
  }

  @media (max-width: 800px) {
    padding: 10px;
    gap: 10px;
  }

  @media (max-width: 600px) {
    padding: 8px;
    gap: 8px;
  }
`;

export const SelectedCharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const SelectedCharacterText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #d8ff91;
  text-align: center;
  margin-bottom: 5px;
`;

export const SelectedCharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid #d8ff91;
  padding: 15px;
  width: 120px;
  height: 120px;
  border-radius: 5px;
`;

export const SelectedImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const CharacterGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height: 120px;
  border-radius: 5px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    padding: 10px;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    padding: 10px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CharacterImage = styled.img<{ selected: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 5px;
  border: ${(props) =>
    props.selected ? "2px solid #d8ff91" : "1px solid transparent"};
  cursor: pointer;
  transition: border 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  border: 2px solid #d8ff91;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  border-radius: 5px;
`;

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #d8ff91;
  background-color: #101010;
  padding: 0 15px;
  position: absolute;
  top: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SelectBox = styled.select`
  background-color: #101010;
  color: #d8ff91;
  border: 1px solid #d8ff91;
  padding: 10px;
  border-radius: 5px;
`;

export const SaveButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  background: transparent;
  color: #d8ff91;
  border: 2px solid #d8ff91;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;

  &:hover {
    background: #d8ff91;
    color: #101010;
  }
`;
