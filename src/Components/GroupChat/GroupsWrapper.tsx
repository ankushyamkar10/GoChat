import { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Group, Message } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import {
  MsgState,
  fecthMessages,
  setMessages,
} from "../../features/Message/MessageSlice";
import Messages from "../Messages/Messages";
import MsgForm from "../MessageForm/MsgForm";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import { HiDotsVertical } from "react-icons/hi";
import useOnClickOutside from "../../Utils/useOnClickOutside";
import { leaveGroup } from "../../features/Group/GroupSlice";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: Group;
};

const GroupsWrapper = (props: Props) => {
  const [upComingMsg, setUpComingMsg] = useState<Message | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const { socket, selected } = props;
  const { loggedInUser } = useAppSelector(userState);
  const { conversation } = useAppSelector(MsgState);
  const { users, fetchGroupsMore } = useContext(FetchDataContext);
  const dispatch = useAppDispatch();
  const msgContainerRef = useRef<HTMLDivElement | null>(null);
  const squareBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket) {
      socket.current?.emit("joinGroup", selected._id);
    }
  }, []);

  const scrollToBottom = () => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (loggedInUser && selected) {
      const msgArg = {
        userId: loggedInUser._id,
        selectedId: selected._id,
      };
      dispatch(fecthMessages(msgArg));
    }
  }, [loggedInUser, selected, fecthMessages, dispatch]);

  useEffect(() => {
    socket.current?.on("recieveMsg", (data: Message) => {
      const new_msg = {
        message: data.message,
        isSenderMe: false,
        senderId: data.senderId,
      };
      console.log(data.senderId, loggedInUser?._id);
      setUpComingMsg(new_msg);
    });
  });

  useEffect(() => {
    if (upComingMsg) {
      if (loggedInUser?._id !== upComingMsg.senderId)
        dispatch(setMessages(upComingMsg));
      setUpComingMsg(null);
    }
  }, [upComingMsg, setMessages, dispatch]);

  const filteredMembers = users.filter((loggedInUser) =>
    selected.members.some((member) => member === loggedInUser._id)
  );

  const handleLeaveGroup = async () => {
    if (loggedInUser) {
      dispatch(leaveGroup({ userId: loggedInUser._id, groupId: selected._id }));
      fetchGroupsMore(loggedInUser._id);
    }
  };

  useOnClickOutside(squareBoxRef, () => {
    setShow(false);
  });

  return (
    <section className="chatbox-section">
      <nav>
        <div className="display-flex">
          <img src={selected.img} alt="" />
          <div className="selected-info">
            <h4>{selected.name}</h4>
            <div className="selected-email">
              {filteredMembers.map((member) => member.name + ", ")}
              You
            </div>
          </div>
        </div>
        <div
          className="icons"
          onClick={() => setShow(!show)}
          ref={squareBoxRef}
        >
          <HiDotsVertical size={20} />
          {show && (
            <div className="absolute w-10">
              <div className="three_dots">
                <div>Profile</div>
                <div className="hover-red" onClick={handleLeaveGroup}>
                  Leave Group
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="message-container-main" ref={msgContainerRef}>
        <Messages isGroup={true} />
      </div>
      <MsgForm socket={socket} selected={selected} />
    </section>
  );
};

export default GroupsWrapper;
