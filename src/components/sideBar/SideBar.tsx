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
  const [isDmOpen, setIsDmOpen] = useState<{ [key: number]: boolean }>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [isRankOpen, setIsRankOpen] = useState(false);
  const [chatFriendNick, setChatFriendNick] = useState("");


  const alertRef = useRef<HTMLDivElement>(null);
  const toggleAlerts = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const toggleDmChat = (friendId: number, friendNick: string) => {
    // { "1": true, "2": false, "3": false }
    setIsDmOpen((prev) => {
      const isCurrentlyOpen: boolean = prev[friendId]; // 현재 상태 확인
      return {
        ...Object.keys(prev).reduce((acc, key) => {
          acc[key] = false; // 모든 버튼을 false로 초기화
          return acc;
        }, {} as { [key: string]: boolean }),
        [String(friendId)]: !isCurrentlyOpen, // 클릭한 버튼만 true로 설정
      };
    });
    setChatFriendNick(friendNick);
    socket.emit("joinDm", friendNick);
    setChatFriendNick(friendNick);
    socket.emit("joinDm", friendNick);

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

        {/* {isDmOpen && <DmChat friendNick={chatFriendNick} />} */}
        {Object.values(isDmOpen).some((isOpen) => isOpen) ? (
          <DmChat friendNick={chatFriendNick} />
        ) : (
          <Rank />
        )}
        {/* {!isDmOpen && <Rank />} */}

      </S.Line>
    </S.Container>
  );
}
