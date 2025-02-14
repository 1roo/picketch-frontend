import React from "react";
import styled from "styled-components";

interface RandomJoinButtonProps {
  onJoin: () => void;
}

const Button = styled.button`
  background-color: #d1ff52;
  color: black;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: black;
    color: #d1ff52;
    border: 1px solid #d1ff52;
  }
`;

const RandomJoinButton: React.FC<RandomJoinButtonProps> = ({ onJoin }) => {
  return <Button onClick={onJoin}>랜덤참여</Button>;
};

export default RandomJoinButton;
