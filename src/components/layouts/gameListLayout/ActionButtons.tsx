import React from "react";

import RandomJoinButton from "../common/gameListPage/gameRoomList/RandomJoinButton";
import CreateRoomButton from "../common/gameListPage/gameRoomList/CreateRoomButton";

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
