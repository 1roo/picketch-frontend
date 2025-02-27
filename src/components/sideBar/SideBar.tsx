import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import * as S from "../../styles/sideBar";
import { useEffect, useRef, useState } from "react";
import DmChat from "./DmChat";
import Friends from "./Friends";
import Rank from "./Rank";
import socket from "../../socket/dmChatSocket";
import Alert from "./Alert";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar() {
  const [isDmOpen, setIsDmOpen] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const alertRef = useRef<HTMLDivElement>(null);
  const toggleAlerts = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const toggleDmChat = (friendNickname: string) => {
    if (isDmOpen && selectedFriend === friendNickname) {
      // 현재 열려 있는 채팅이 동일한 친구라면 닫기
      setIsDmOpen(false);
      setSelectedFriend(null);
    } else {
      // 다른 친구라면 새로운 채팅 열기
      setIsDmOpen(true);
      setSelectedFriend(friendNickname);
      socket.emit("joinDm", friendNickname);
    }
  };
  useEffect(() => {
    console.log(isDmOpen);
  }, []);

  return (
    <S.Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "25px",
          padding: "15px",
        }}
      >
        <p>친구 목록</p>
        <FontAwesomeIcon
          icon={faBell}
          style={{ cursor: "pointer" }}
          onClick={toggleAlerts}
        />
      </div>

      <Alert isOpen={isAlertOpen} onClose={toggleAlerts} />

      <Friends toggleDmChat={toggleDmChat} />
      <S.Line>
        {isDmOpen && selectedFriend ? (
          <DmChat friendNick={selectedFriend} />
        ) : (
          <Rank />
        )}
      </S.Line>
    </S.Container>
  );
}
