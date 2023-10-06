import { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { MsgState } from "../../features/Message/MessageSlice";
import UsersWapper from "../SingleChat/UsersWrapper";
import GroupsWrapper from "../GroupChat/GroupsWrapper";
import { userState } from "../../features/Auth/AuthSlice";
import FetchDataContext from "../../features/FetchData/FetchDataContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Chatbox = (props: Props) => {
  const { socket } = props;
  const { selected } = useAppSelector(MsgState);
  const { loggedInUser } = useAppSelector(userState);
  // const { groups } = useAppSelector(DataState);
  const { fetchGroupsMore, groups } = useContext(FetchDataContext);

  useEffect(() => {
    if (groups.length === 0 && loggedInUser) {
      fetchGroupsMore(loggedInUser?._id);
    } else {
      groups.forEach((grp) => {
        socket.current?.emit("joinGroup", grp._id);
      });
    }
  }, []);
  useEffect(() => console.log("rerendered"), [socket]);
  useEffect(() => console.log("seleccted"), [selected]);
  if (!selected) {
    return <div className="nochat-div">No Chats</div>;
  } else if ("email" in selected) {
    return <UsersWapper socket={socket} selected={selected} />;
  } else {
    return <GroupsWrapper selected={selected} socket={socket} />;
  }
};

export default Chatbox;
