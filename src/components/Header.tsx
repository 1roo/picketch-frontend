import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background-color: #101010;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #d8ff91;
  text-decoration: none;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: #d8ff91;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
`;

export default function Header() {
  const { isLoggedIn, setLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await setLogout();
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Nav>
        {isLoggedIn ? (
          <>
            <NavLink to="/game-list-page">게임 목록</NavLink>
            <NavLink to="/profile">프로필</NavLink>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <NavLink to="/profile">정보</NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
}
