import React from "react";
import styled from "styled-components";

interface CreateRoomButtonProps {
  onCreate: () => void;
}

const Button = styled.button`
  background-color: #d8ff91;
  color: black;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: black;
    color: #d8ff91;
    border: 1px solid #d8ff91;
  }
`;

const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({ onCreate }) => {
  return <Button onClick={onCreate}>방 생성</Button>;
};

export default CreateRoomButton;
