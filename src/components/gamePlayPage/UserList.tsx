import UserCard from "./UserCard";

interface UserListProps {
  users: {
    nickname: string;
    score: number;
    region: string;
    profileImg: string;
  }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div
      style={{
        width: "30%",
        marginTop: "5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid pink",
      }}>
      {users.map((user) => (
        <UserCard
          key={user.nickname}
          nickname={user.nickname}
          score={user.score}
          region={user.region}
          profileImg={user.profileImg}
        />
      ))}
    </div>
  );
};

export default UserList;
