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
  const [selectedCharacter, setSelectedCharacter] = useState<string>(
    "/images/chicken.png"
  );
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

        const nicknameFromResponse = response.data.data.nickname || "";
        if (nicknameFromResponse.startsWith("T")) {
          setNickName("");
          setIsAvailable(false);
        } else {
          setNickName(nicknameFromResponse);
          setIsAvailable(true);
        }
        setSelectedCharacter(
          response.data.data.character === "default_character.png"
            ? "/images/chicken.png"
            : response.data.data.character
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

  // 유효성 검사
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
        setErrorMessage("이미 사용 중인 닉네임입니다.");
        setIsAvailable(false);
      } else {
        setErrorMessage("서버 오류 발생. 다시 로그인해주세요.");
        setIsAvailable(false);
        navigate("/");
      }
    } finally {
      setIsChecking(false);
    }
  };

  // 저장 핸들러
  const handleSave = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }
    if (!nickName.trim()) {
      alert("닉네임을 입력하세요");
      return;
    }

    if (isSetupMode) {
      if (!nickName || isAvailable === false) {
        setErrorMessage("닉네임 중복 검사를 완료해주세요.");
        return;
      }
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
      console.log("유저데이타: ", userData);

      console.log("✅ 프로필 저장 성공:", response.data);
      alert("프로필이 저장되었습니다!");
      window.location.href = isSetupMode ? "/game-list-page" : "/profile";
    } catch (error) {
      console.error("❌ 프로필 저장 실패:", error);
      alert("프로필 저장에 실패했습니다. 다시 로그인해주세요.");
      navigate("/");
    }
  };

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까? 😢")) {
      return;
    }

    try {
      await api.delete("/api/user/profile/me"); // 회원 탈퇴 API 호출

      alert("회원 탈퇴가 완료되었습니다.");

      // 인증 상태 초기화 (로그아웃 처리)
      useAuthStore.getState().setLogout();

      navigate("/"); // 홈페이지 또는 로그인 페이지로 이동
    } catch (error) {
      console.error("❌ 회원 탈퇴 실패:", error);
      alert("회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
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

      <P.SaveButton onClick={handleSave} disabled={isChecking}>
        {isChecking ? "검사 중..." : "저장"}
      </P.SaveButton>

      <P.DeleteButton onClick={handleDeleteAccount}>회원 탈퇴</P.DeleteButton>
    </P.ProfileWrapper>
  );
};

export default ProfileEditor;
