import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";
import UsersWapper from "../SingleChat/UsersWrapper";
import GroupsWrapper from "../GroupChat/GroupsWrapper";
import {
  DataState,
  fetchGroups,
} from "../../features/FetchData/FetchDataSlice";
import { userState } from "../../features/Auth/AuthSlice";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Chatbox = (props: Props) => {
  const { socket } = props;
  const { selected } = useAppSelector(MsgState);
  const { user } = useAppSelector(userState);
  const { groups } = useAppSelector(DataState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (groups.length === 0 && user) dispatch(fetchGroups(user));
    else {
      groups.forEach((grp) => {
        socket.current?.emit("joinGroup", grp._id);
      });
    }
  }, []);

  if (!selected) {
    return <div className="nochat-div">No Chats</div>;
  } else if ("email" in selected) {
    return <UsersWapper socket={socket} selected={selected} />;
  } else {
    return <GroupsWrapper selected={selected} socket={socket} />;
  }
};

export default Chatbox;
