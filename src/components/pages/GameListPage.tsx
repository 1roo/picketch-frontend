import React from "react";
import styled from "styled-components";
import Sidebar from "../ui/gameListPage/sideBar/SideBar";
import GameRoomList from "../layouts/gameListLayout/GameList";
import TabBar from "../ui/gameListPage/TabBar/TabBar";
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 400px;
  flex-shrink: 0;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const GameListPage: React.FC = () => {
  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>
        <GameRoomList />
      </ContentContainer>
      <TabBar />
    </LayoutContainer>
  );
};

export default GameListPage;
