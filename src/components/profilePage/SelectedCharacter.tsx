import React from "react";
import {
  SelectedCharacterContainer,
  SelectedCharacterText,
  SelectedCharacterWrapper,
  SelectedImage,
} from "../../styles/profilePage/profileStyle";

type Props = {
  selectedCharacter: string;
};

const SelectedCharacter: React.FC<Props> = ({ selectedCharacter }) => {
  return (
    <SelectedCharacterWrapper>
      <SelectedCharacterText>선택 캐릭터</SelectedCharacterText>
      <SelectedCharacterContainer>
        <SelectedImage src="/images/chicken.png" alt="선택된 캐릭터" />
      </SelectedCharacterContainer>
    </SelectedCharacterWrapper>
  );
};

export default SelectedCharacter;
