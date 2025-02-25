import React from "react";
import styled from "styled-components";
import Sidebar from "../components/sideBar/SideBar";
import GameRoomList from "../components/gameListPage/GameList";
import TabBar from "../components/TabBar/TabBar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  gap: 0px;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  flex: 0 0 400px;
  min-width: 200px;
  flex-shrink: 0;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media (max-width: 1024px) {
    flex: 0 0 300px;
  }

  @media (max-width: 900px) {
    flex: 0 0 250px;
  }

  @media (max-width: 800px) {
    flex: 0 0 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
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
