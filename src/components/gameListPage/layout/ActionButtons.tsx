import React from "react";

import RandomJoinButton from "../gameRoomList/RandomJoinButton";
import CreateRoomButton from "../gameRoomList/CreateRoomButton";

interface ActionButtonsProps {
  onRandomJoin: () => void;
  onCreateRoom: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onRandomJoin,
  onCreateRoom,
}) => {
  return (
    <>
      <RandomJoinButton onJoin={onRandomJoin} />
      <CreateRoomButton onCreate={onCreateRoom} />
    </>
  );
};

export default ActionButtons;
