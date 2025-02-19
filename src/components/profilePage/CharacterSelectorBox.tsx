import React from "react";
import SelectedCharacter from "./SelectedCharacter";
import CharacterGrid from "./CharacterGrid";
import { CharacterSelectorContainer } from "../../styles/profilePage/profileStyle";

type Props = {
  selectedCharacter: string;
  onSelectCharacter: (char: string) => void;
};

const CharacterSelectorBox: React.FC<Props> = ({
  selectedCharacter,
  onSelectCharacter,
}) => {
  return (
    <CharacterSelectorContainer>
      <SelectedCharacter selectedCharacter={selectedCharacter} />
      <CharacterGrid
        selectedCharacter={selectedCharacter}
        onSelectCharacter={onSelectCharacter}
      />
    </CharacterSelectorContainer>
  );
};

export default CharacterSelectorBox;
