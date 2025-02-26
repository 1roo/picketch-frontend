import UserCard from "./UserCard";
import { UserListContainer } from "../../styles/gameplayPage/gameplayPageStyle";

interface UserListProps {
  users: {
    nickname: string;
    score: number;
    region: string;
    character: string;
  }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <UserListContainer>
      {users.map((user) => (
        <UserCard
          key={user.nickname}
          nickname={user.nickname}
          score={user.score}
          region={user.region}
          profileImg={user.character}
        />
      ))}
    </UserListContainer>
  );
};

export default UserList;
