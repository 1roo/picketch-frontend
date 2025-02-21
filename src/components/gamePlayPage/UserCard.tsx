import {
  UserCardContainer,
  ProfileImgContainer,
  UserInfo,
} from "../../styles/gameplayPage/gameplayPageStyle";

interface UserProps {
  nickname: string;
  score: number;
  region: string;
  profileImg: string;
}

const UserCard: React.FC<UserProps> = ({
  nickname,
  score,
  region,
  profileImg,
}) => {
  return (
    <UserCardContainer>
      <ProfileImgContainer>
        <img src={profileImg} alt="프로필이미지"></img>
      </ProfileImgContainer>
      <UserInfo>
        <span>{nickname}+</span>
        <span>{score}</span>
        <span>{region}</span>
      </UserInfo>
    </UserCardContainer>
  );
};

export default UserCard;
