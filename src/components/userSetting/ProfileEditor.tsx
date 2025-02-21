import React, { useState } from "react";
import CharacterSelectorBox from "../profilePage/CharacterSelectorBox";
import RegionSelector from "../profilePage/RegionSelector";
import NicknameInput from "./NickNameInput";
import * as P from "../../styles/profilePage/profileStyle";

interface ProfileEditorProps {
  isSetupMode: boolean; // 회원가입 모드 여부
}

const SaveName: string[] = ["123", "qwer", "asdf", "zxcv"];

const ProfileEditor: React.FC<ProfileEditorProps> = ({ isSetupMode }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    "/images/chicken.png"
  );
  const [selectedRegion, setSelectedRegion] = useState("강남구");
  const [nickName, setNickName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // 닉네임 중복 검사
  const handleCheckDuplicate = () => {
    if (nickName.trim() === "") {
      setErrorMessage("닉네임을 입력해주세요");
      setIsAvailable(false);
      return;
    }

    if (nickName.length < 3 || nickName.length > 10) {
      setErrorMessage("닉네임은 3자 이상 10자 이하로 입력해주세요.");
      setIsAvailable(false);
      return;
    }

    if (!/^[a-zA-Z0-9가-힣]+$/.test(nickName)) {
      setErrorMessage("한글, 영어, 숫자만 사용 가능합니다.");
      setIsAvailable(false);
      return;
    }

    if (SaveName.includes(nickName)) {
      setErrorMessage("이미 사용 중인 닉네임입니다.");
      setIsAvailable(false);
      return;
    }

    setErrorMessage("");
    setIsAvailable(true);
  };

  // 저장 핸들러
  const handleSave = () => {
    if (isSetupMode && (!nickName || isAvailable === false)) {
      setErrorMessage("닉네임을 확인해주세요.");
      return;
    }

    alert(
      `저장됨! ${
        isSetupMode ? `닉네임: ${nickName}, ` : ""
      }캐릭터: ${selectedCharacter}, 지역: ${selectedRegion}`
    );

    // 저장 후 이동할 페이지 설정
    window.location.href = isSetupMode ? "/game-list-page" : "/profile";
  };

  return (
    <P.ProfileWrapper>
      <P.TitleContainer>
        <P.Title>{isSetupMode ? "추가 정보" : "프로필 수정"}</P.Title>
      </P.TitleContainer>

      {/* 캐릭터 선택 */}
      <CharacterSelectorBox
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
      />

      {/* 닉네임 입력 */}

      <NicknameInput
        nickName={nickName}
        setNickName={setNickName}
        errorMessage={errorMessage}
        isAvailable={isAvailable}
        handleCheckDuplicate={handleCheckDuplicate}
      />

      {/* 지역 선택  (회원가입 안 된 경우에만 보이도록)*/}
      {isSetupMode && (
        <RegionSelector
          selectedRegion={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        />
      )}

      {/* 저장 버튼 */}
      <P.SaveButton onClick={handleSave}>저장</P.SaveButton>
    </P.ProfileWrapper>
  );
};

export default ProfileEditor;
