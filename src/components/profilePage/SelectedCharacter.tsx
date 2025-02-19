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
        <SelectedImage src={selectedCharacter} alt={selectedCharacter} />
      </SelectedCharacterContainer>
    </SelectedCharacterWrapper>
  );
};

export default SelectedCharacter;
