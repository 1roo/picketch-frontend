import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 1500px;
  height: 100vh;
  margin: 0 auto;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 100vh;
`;

export const MainLogo = styled.img`
  width: 600px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 100vh;
`;

export const LoginBox = styled.div`
  position: relative;
  display: flex;
  padding: 30px 20px;
  border: 2px solid #d8ff91;
  border-radius: 5px;
`;

export const SocialLogo = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 10px;
  cursor: pointer;
`;

export const Title = styled.p`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  background-color: #101010;
  font-weight: bold;
  font-size: 23px;
`;
