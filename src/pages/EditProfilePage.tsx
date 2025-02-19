import React from "react";
import Sidebar from "../components/sideBar/SideBar";
import ProfileEditor from "../components/profilePage/ProfileEditor";
import {
  PageContainer,
  ProfileContainer,
} from "../styles/profilePage/profileStyle";
import styled from "styled-components";
import TabBar from "../components/TabBar/TabBar";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  gap: 0px;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 400px;
  flex-shrink: 0;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (max-width: 1024px) {
    width: 300px;
  }

  @media (max-width: 900px) {
    width: 250px;
  }

  @media (max-width: 800px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfilePage: React.FC = () => {
  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <PageContainer>
        <ProfileContainer>
          <ProfileEditor />
        </ProfileContainer>
      </PageContainer>
      <TabBar />
    </LayoutContainer>
  );
};

export default ProfilePage;
