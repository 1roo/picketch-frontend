import Character from "../components/userSetting/Character";
import * as M from "../styles/loginPage/mainPageStyle";
import styled from "styled-components";

export default function UserSettingPage() {
  const ChangeLogoBox = styled(M.LogoBox)`
    @media (max-width: 700px) {
      display: none;
    }
  `;

  const ChangeLoginContainer = styled(M.LoginContainer)`
    @media (max-width: 700px) {
      height: 100vh;
      margin: 10% 0 3% 0;
    }
  `;

  return (
    <>
      <M.Container>
        <ChangeLogoBox>
          <M.MainLogo src="/images/picketch.png" alt="logo-image" />
        </ChangeLogoBox>
        <ChangeLoginContainer>
          <Character />
        </ChangeLoginContainer>
      </M.Container>
    </>
  );
}
