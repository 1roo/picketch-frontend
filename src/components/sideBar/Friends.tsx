import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as S from "../../styles/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FriendsProps {
  toggleDmChat: () => void;
}

export default function Friends({ toggleDmChat }: FriendsProps) {
  return (
    <S.FriendsDiv>
      <p>친구목록</p>
      <S.FrindDiv>
        <span>감자가돌아</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button" onClick={toggleDmChat}>
            DM
          </button>
          <FontAwesomeIcon icon={faCircle} style={{ fontSize: "10px" }} />
        </div>
      </S.FrindDiv>
      <S.AddFriend type="button">
        <FontAwesomeIcon icon={faPlus} size="xs" /> 친구추가
      </S.AddFriend>
    </S.FriendsDiv>
  );
}
