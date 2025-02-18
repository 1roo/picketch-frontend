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
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
