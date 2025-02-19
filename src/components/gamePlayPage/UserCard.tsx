import styled from "styled-components";

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
    <Container>
      <ProfileImgContainer>
        <img src={profileImg} alt="프로필이미지"></img>
      </ProfileImgContainer>
      <UserInfo>
        <span>{nickname}+</span>
        <span>{score}</span>
        <span>{region}</span>
      </UserInfo>
    </Container>
  );
};

export default UserCard;

const Container = styled.div`
  border: 2px solid #d8ff91;
  border-radius: 5px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 3px;
`;

const ProfileImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8ff91;
  border-radius: 5px;
  margin-right: 5px;
`;

const UserInfo = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  span {
    border: 1px solid #d8ff91;
    border-radius: 5px;
    margin: 2px 0;
    font-size: 0.8em;
  }
`;
