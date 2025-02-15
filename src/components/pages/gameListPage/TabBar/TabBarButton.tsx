import styled from "styled-components";
import { TabBarButton } from "../../../../interfaces/tabBar";

const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  font-size: 12px;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const IconImage = styled.img`
  width: 30px;
  height: 30px;
`;

const TabBarButtons: React.FC<TabBarButton> = ({ imgSrc, label, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <IconImage src={imgSrc} alt={label} />
      <span>{label}</span>
    </ButtonWrapper>
  );
};

export default TabBarButtons;
