import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import * as S from "../../styles/sideBar";
import { useEffect, useRef, useState } from "react";
import DmChat from "./DmChat";
import Rank from "./Rank";
import Friends from "./Friends";

export default function Sidebar() {
  const [isDmOpen, setIsDmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const alertRef = useRef<HTMLDivElement>(null);
  const toggleAlerts = () => {
    setIsAlertOpen(!isAlertOpen);
  };
  const toggleDmChat = () => {
    setIsDmOpen(!isDmOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target as Node)
      ) {
        setIsAlertOpen(false);
      }
    };

    if (isAlertOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAlertOpen]);
  return (
    <S.Container>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "25px",
          padding: "15px",
        }}
      >
        <FontAwesomeIcon
          icon={faBell}
          style={{ cursor: "pointer" }}
          onClick={toggleAlerts}
        />
      </div>
      {isAlertOpen && (
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
              onClick={toggleAlerts}
            />
          </div>
          <p>닉네임: 야야 접속중</p>
          <p>초 대: 홍길동님의 초대</p>
        </S.AlertDiv>
      )}
      <Friends toggleDmChat={toggleDmChat} />
      <S.Line>
        {isDmOpen && <DmChat />}
        <Rank />
      </S.Line>
    </S.Container>
  );
}
