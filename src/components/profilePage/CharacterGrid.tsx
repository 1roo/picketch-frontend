import React, { useEffect } from "react";
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

  // 기본 캐릭터 설정 (선택된 캐릭터가 없을 경우)
  useEffect(() => {
    if (!selectedCharacter) {
      onSelectCharacter("/images/chicken.png");
    }
  }, [selectedCharacter, onSelectCharacter]);

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
