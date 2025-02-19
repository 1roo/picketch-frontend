import React from "react";
import ProfileEditor from "../components/userSetting/ProfileEditor";
import {
  PageContainer,
  ProfileContainer,
} from "../styles/profilePage/profileStyle";
import styled from "styled-components";
import * as M from "../styles/loginPage/mainPageStyle";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  gap: 0px;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserSetupPage: React.FC = () => {
  return (
    <LayoutContainer>
      <LogoContainer>
        <M.LogoBox>
          <M.MainLogo src="/images/picketch.png" alt="Picketch Logo" />
        </M.LogoBox>
      </LogoContainer>
      <PageContainer>
        <ProfileContainer>
          <ProfileEditor isSetupMode={true} />
        </ProfileContainer>
      </PageContainer>
    </LayoutContainer>
  );
};

export default UserSetupPage;
