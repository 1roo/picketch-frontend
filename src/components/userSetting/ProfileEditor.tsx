import React, { useState } from "react";
import CharacterSelectorBox from "../profilePage/CharacterSelectorBox";
import RegionSelector from "../profilePage/RegionSelector";
import NicknameInput from "./NickNameInput";
import * as P from "../../styles/profilePage/profileStyle";
import axios, { AxiosError } from "axios";

interface ProfileEditorProps {
  isSetupMode: boolean; // 회원가입 모드 여부
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ isSetupMode }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    "/images/chicken.png"
  );
  const [selectedRegion, setSelectedRegion] = useState<number>(1);
  const [nickName, setNickName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(event.target.value);
    setSelectedRegion(regionId);
  };

  // 닉네임 중복 검사 (DB와 비교)
  const handleCheckDuplicate = async () => {
    if (!nickName.trim()) {
      setErrorMessage("닉네임을 입력해주세요.");
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

    setIsChecking(true);
    setErrorMessage("");

    try {
      console.log(`📡 닉네임 중복 체크 요청: ${nickName}`);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/profile/check-nickname`,
        { params: { nickname: nickName } }
      );

      console.log("✅ 닉네임 사용 가능");
      setIsAvailable(true);
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("❌ 닉네임 중복");
          setIsAvailable(false);
          setErrorMessage("이미 사용 중인 닉네임입니다.");
        } else {
          setErrorMessage(`서버 오류 발생 (${error.response?.status})`);
          setIsAvailable(false);
        }
      } else {
        setErrorMessage("🚨 알 수 없는 오류가 발생했습니다.");
        setIsAvailable(false);
      }
    } finally {
      setIsChecking(false);
    }
  };

  // 저장 핸들러
  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("❌ accessToken이 없습니다.");
      alert("로그인이 필요합니다.");
      return;
    }

    if (isSetupMode && (!nickName || isAvailable === false)) {
      setErrorMessage("닉네임을 확인해주세요.");
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

      {/* 지역 선택  (회원가입 안 된 경우에만 보이도록) */}
      {isSetupMode && (
        <RegionSelector
          selectedRegion={selectedRegion}
          onChange={handleRegionChange}
        />
      )}

      {/* 저장 버튼 (닉네임 중복 확인 통과 시 활성화) */}
      <P.SaveButton
        onClick={handleSave}
        disabled={isAvailable === false || isChecking}
      >
        {isChecking ? "검사 중..." : "저장"}
      </P.SaveButton>
    </P.ProfileWrapper>
  );
};

export default ProfileEditor;
