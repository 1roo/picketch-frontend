import React from "react";
import {
  CharacterGridContainer,
  CharacterImage,
} from "../../styles/profilePage/profileStyle";

type Props = {
  selectedCharacter: string;
  onSelectCharacter: (char: string) => void;
};

const CharacterGrid: React.FC<Props> = ({
  selectedCharacter,
  onSelectCharacter,
}) => {
  const characters = [
    "/images/chicken.png",
    "/images/cow.png",
    "/images/dog.png",
    "/images/dragon.png",
    "/images/horse.png",
    "/images/monkey.png",
    "/images/mouse.png",
    "/images/pig.png",
    "/images/rabbit.png",
    "/images/sheep.png",
    "/images/snake.png",
    "/images/tiger.png",
  ];

  return (
    <CharacterGridContainer>
      {characters.map((char) => (
        <CharacterImage
          key={char}
          src={char}
          alt="캐릭터 선택"
          onClick={() => onSelectCharacter(char)}
          selected={char === selectedCharacter}
        />
      ))}
    </CharacterGridContainer>
  );
};

export default CharacterGrid;
