import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Group, Message } from "../../Types/types";
import { MdPhone, MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import {
  MsgState,
  fecthMessages,
  sendMessage,
  setMessages,
} from "../../features/Message/MessageSlice";
import { DataState } from "../../features/FetchData/FetchDataSlice";
import Messages from "../Messages/Messages";
import MsgForm from "../MessageForm/MsgForm";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: Group;
};

const GroupsWrapper = (props: Props) => {
  const { socket, selected } = props;
  const { user } = useAppSelector(userState);
  const { users } = useAppSelector(DataState);
  const [upComingMsg, setUpComingMsg] = useState<Message | null>(null);
  const dispatch = useAppDispatch();
  const msgContainerRef = useRef<HTMLDivElement | null>(null);
  const { conversation } = useAppSelector(MsgState);

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
    if (user && selected) {
      const msgArg = {
        userId: user._id,
        selectedId: selected._id,
      };
      dispatch(fecthMessages(msgArg));
    }
  }, [user, selected, fecthMessages, dispatch]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (
  //     user &&
  //     selected &&
  //     msgRef.current?.value &&
  //     msgRef.current.value.length > 0
  //   ) {
  //     socket.current?.emit("sendMsg", {
  //       text: msgRef.current.value,
  //       sender: user._id,
  //       recieverId: selected._id,
  //     });

  //     const msgArg = {
  //       text: msgRef.current.value,
  //       sender: user._id,
  //       reciever: selected._id,
  //     };

  //     dispatch(sendMessage(msgArg));
  //     // dispatch(
  //     //   fecthMessages({
  //     //     userId: user._id,
  //     //     selectedId: selected._id,
  //     //   })
  //     // );
  //     msgRef.current.value = "";
  //   }
  // };

  useEffect(() => {
    socket.current?.on("recieveMsg", (data: Message) => {
      const new_msg = {
        message: data.message,
        isSenderMe: false,
        sender: data.sender,
      };

      setUpComingMsg(new_msg);
    });
  });

  useEffect(() => {
    if (upComingMsg) {
      if (user?._id !== upComingMsg.sender) dispatch(setMessages(upComingMsg));
      setUpComingMsg(null);
    }
  }, [upComingMsg, setMessages, dispatch]);

  const filteredMembers = users.filter((user) =>
    selected.members.some((member) => member === user._id)
  );

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
      </nav>
      <div className="message-container-main" ref={msgContainerRef}>
        <Messages isGroup={true} />
      </div>
      <MsgForm socket={socket} selected={selected} />
    </section>
  );
};

export default GroupsWrapper;
