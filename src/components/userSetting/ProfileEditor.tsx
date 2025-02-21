import React, { useState } from "react";
import CharacterSelectorBox from "../profilePage/CharacterSelectorBox";
import RegionSelector from "../profilePage/RegionSelector";
import NicknameInput from "./NickNameInput";
import * as P from "../../styles/profilePage/profileStyle";
import axios from "axios";

interface ProfileEditorProps {
  isSetupMode: boolean; // 회원가입 모드 여부
}

const SaveName: string[] = ["123", "qwer", "asdf", "zxcv"];

const ProfileEditor: React.FC<ProfileEditorProps> = ({ isSetupMode }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    "/images/chicken.png"
  );
  const [selectedRegion, setSelectedRegion] = useState<number>(1); // number로 초기값 설정
  const [nickName, setNickName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(event.target.value);
    // event.target.value는 string이므로, 이를 number로 변환하여 상태 업데이트
    setSelectedRegion(regionId); // regionId를 상태로 업데이트
  };

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
  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("❌ accessToken이 없습니다.");
      alert("로그인이 필요합니다.");
      return;
    }

    const userData = {
      nickname: nickName,
      regionId: selectedRegion,
      character: selectedCharacter,
    };

    console.log(
      "📡 요청 URL:",
      `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`
    );
    console.log("📡 요청 데이터:", userData);
    console.log("📡 요청 헤더 - Authorization:", `Bearer ${token}`);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ 프로필 저장 성공:", response.data);
      alert("프로필이 저장되었습니다!");
      window.location.href = isSetupMode ? "/game-list-page" : "/profile";
    } catch (error) {
      console.error("❌ 프로필 저장 실패:", error);

      alert("프로필 저장에 실패했습니다.");
    }
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
          onChange={handleRegionChange}
        />
      )}

      {/* 저장 버튼 */}
      <P.SaveButton onClick={handleSave}>저장</P.SaveButton>
    </P.ProfileWrapper>
  );
};

export default ProfileEditor;
