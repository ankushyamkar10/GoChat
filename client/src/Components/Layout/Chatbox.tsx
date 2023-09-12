import { Socket } from "socket.io-client";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";

import UsersWapper from "../SingleChat/UsersWrapper";
import GroupsWrapper from "../GroupChat/GroupsWrapper";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Chatbox = (props: Props) => {
  const { socket } = props;
  const { selected } = useAppSelector(MsgState);

  if (!selected) {
    return <div className="nochat-div">No Chats</div>;
  } else if ("email" in selected) {
    return <UsersWapper socket={socket} selected={selected} />;
  } else {
    return <GroupsWrapper selected={selected} socket={socket} />;
  }
};

export default Chatbox;
