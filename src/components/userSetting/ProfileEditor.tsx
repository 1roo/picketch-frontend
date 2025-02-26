import React, { useEffect, useState } from "react";
import CharacterSelectorBox from "../profilePage/CharacterSelectorBox";
import RegionSelector from "../profilePage/RegionSelector";
import NicknameInput from "./NickNameInput";
import * as P from "../../styles/profilePage/profileStyle";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import useAuthStore from "../../store/useAuthStore";

interface ProfileEditorProps {
  isSetupMode: boolean;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ isSetupMode }) => {
  const { userId } = useAuthStore();
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<number>(1);
  const [nickName, setNickName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!userId) return;

        const response = await api.get(`/api/user/profile/me`);
        console.log("✅ 유저 정보:", response.data);

        setNickName(response.data.data.nickname || "");
        setIsAvailable(true);
        setSelectedCharacter(
          response.data.data.character ?? "/images/chicken.png"
        );
        setSelectedRegion(response.data.data.regionId || 1);
      } catch (error) {
        console.error("❌ 유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(event.target.value);
    setSelectedRegion(regionId);
  };

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
      await api.get(`/api/user/profile/check-nickname`, {
        params: { nickname: nickName },
      });

      console.log("✅ 닉네임 사용 가능");
      setIsAvailable(true);
      setErrorMessage("");
    } catch (error) {
      if (api.isAxiosError(error) && error.response?.status === 400) {
        console.log("❌ 닉네임 중복");
        setIsAvailable(false);
        setErrorMessage("이미 사용 중인 닉네임입니다.");
      } else {
        setErrorMessage("서버 오류 발생. 다시 로그인해주세요.");
        setIsAvailable(false);
        navigate("/");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/");
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

    try {
      const response = await api.post(`/api/user/profile`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ 프로필 저장 성공:", response.data);
      alert("프로필이 저장되었습니다!");
      window.location.href = isSetupMode ? "/game-list-page" : "/profile";
    } catch (error) {
      console.error("❌ 프로필 저장 실패:", error);
      alert("프로필 저장에 실패했습니다. 다시 로그인해주세요.");
      navigate("/");
    }
  };

  return (
    <P.ProfileWrapper>
      <P.TitleContainer>
        <P.Title>{isSetupMode ? "추가 정보" : "프로필 수정"}</P.Title>
      </P.TitleContainer>

      <CharacterSelectorBox
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
      />

      <NicknameInput
        nickName={nickName}
        setNickName={setNickName}
        errorMessage={errorMessage}
        isAvailable={isAvailable}
        handleCheckDuplicate={handleCheckDuplicate}
      />

      {isSetupMode && (
        <RegionSelector
          selectedRegion={selectedRegion}
          onChange={handleRegionChange}
        />
      )}

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
