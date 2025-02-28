import styled from 'styled-components';
const FooterContainer = styled.footer`
  width: 100%;
  height: 60px;
  background-color: #d8ff91;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

export default function Footer() {
  return <FooterContainer>© 2025 Picketch. All rights reserved.</FooterContainer>;
}
