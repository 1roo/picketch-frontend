import React from "react";
import * as P from "../../styles/profilePage/profileStyle";

interface NicknameInputProps {
  nickName: string;
  setNickName: (value: string) => void;
  errorMessage: string;
  isAvailable: boolean | null;
  handleCheckDuplicate: () => void;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  nickName,
  setNickName,
  errorMessage,
  isAvailable,
  handleCheckDuplicate,
}) => {
  return (
    <P.NicknameContainer>
      <P.NicknameWrapper>
        <P.NicknameLabel>닉네임</P.NicknameLabel>
        <P.NickNameInput
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임 입력"
        />
        <P.CheckButton onClick={handleCheckDuplicate}>중복 확인</P.CheckButton>
      </P.NicknameWrapper>

      {/* 에러 메시지 또는 성공 메시지 출력 */}
      {errorMessage && <P.ErrorMessage>{errorMessage}</P.ErrorMessage>}
      {isAvailable && (
        <P.SuccessMessage>사용 가능한 닉네임입니다.</P.SuccessMessage>
      )}
    </P.NicknameContainer>
  );
};

export default NicknameInput;
