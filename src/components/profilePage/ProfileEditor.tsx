import React, { useState } from "react";
import CharacterSelectorBox from "./CharacterSelectorBox";
import {
  ProfileWrapper,
  TitleContainer,
  Title,
  SelectBox,
  SaveButton,
  SelectContainer,
} from "../../styles/profilePage/profileStyle";

const ProfileEditor: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    "/images/chicken.png"
  );
  const [selectedRegion, setSelectedRegion] = useState("강남구");

  const handleSave = () => {
    alert(`저장됨! 캐릭터: ${selectedCharacter}, 지역: ${selectedRegion}`);
  };

  return (
    <ProfileWrapper>
      <TitleContainer>
        <Title>정보 수정</Title>
      </TitleContainer>
      <CharacterSelectorBox
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
      />
      <SelectContainer>
        <h3>지역</h3>
        <SelectBox
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option>강남구</option>
          <option>서초구</option>
          <option>마포구</option>
          <option>종로구</option>
        </SelectBox>
      </SelectContainer>
      <SaveButton onClick={handleSave}>저장</SaveButton>
    </ProfileWrapper>
  );
};

export default ProfileEditor;
