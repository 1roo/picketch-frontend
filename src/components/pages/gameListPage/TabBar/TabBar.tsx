import styled from "styled-components";
import TabBarButton from "./TabBarButton";

const TabBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #101010;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid #d1ff52;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const TabBar = () => {
  return (
    <TabBarContainer>
      <TabBarButton
        imgSrc="/images/game.png"
        label="랜덤게임"
        onClick={() => alert("랜덤 게임")}
      />
      <TabBarButton
        imgSrc="/images/chat.png"
        label="디엠"
        onClick={() => alert("디엠")}
      />
      <TabBarButton
        imgSrc="/images/mail.png"
        label="친구"
        onClick={() => alert("초대 알림")}
      />
      <TabBarButton
        imgSrc="/images/person.png"
        label="설정"
        onClick={() => alert("마이 페이지")}
      />
    </TabBarContainer>
  );
};

export default TabBar;
