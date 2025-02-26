import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import * as S from "../../styles/sideBar";
import { useEffect, useRef } from "react";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function Alert({ isOpen, onClose }: AlertProps) {
  const alertRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <S.AlertDiv ref={alertRef}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faX}
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      <S.NoticeAlert>알림 내용</S.NoticeAlert>
      <S.NoneRead>읽지 않은 알림 (1)건</S.NoneRead>
      <S.AlertContainer>
        <S.TypeBox>
          <S.GameType>(초대 유형)</S.GameType>
          <S.SendTime>(보낸 시간)</S.SendTime>
        </S.TypeBox>
        <S.RequestContent>(~~~)님의 게임 요청</S.RequestContent>
        <S.ButtonBox>
          <S.AcceptButton>수락</S.AcceptButton>
          <S.RejectButton>거절</S.RejectButton>
        </S.ButtonBox>
      </S.AlertContainer>
    </S.AlertDiv>
  );
}
