import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as S from "../../styles/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import api from "../../utils/axios";
import DmChat from "./DmChat";

interface FriendsProps {
  toggleDmChat: (friendNickname: string) => void;
}

interface Friend {
  friendId: number;
  friendNickname: string;
}

export default function Friends({ toggleDmChat }: FriendsProps) {
  const [friends, setFriends] = useState<Friend[]>([]); // 친구 목록을 저장할 상태

  // 컴포넌트가 마운트될 때 친구 목록을 가져오는 함수
  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get("/api/friend"); // 친구 목록을 가져오는 API 호출
        console.log("응답 받은 데이터:", response.data);
        setFriends(response.data.data.friends || []); // 응답에서 친구 데이터를 받아와 상태에 저장
      } catch (error) {
        console.error("친구 목록을 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    getFriends(); // 함수 실행
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <S.FriendsDiv>
      {/* <p>친구목록</p> */}

      {friends.length > 0 ? (
        friends.map((friend) => (
          <S.FrindDiv key={friend.friendId}>
            <span>{friend.friendNickname}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => toggleDmChat(friend.friendNickname)}
              >
                DM
              </button>
              <FontAwesomeIcon icon={faCircle} style={{ fontSize: "10px" }} />
            </div>
          </S.FrindDiv>
        ))
      ) : (
        <p>친구가 없습니다.</p>
      )}
    </S.FriendsDiv>
  );
}
