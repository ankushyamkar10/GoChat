import { useEffect, useRef, useState } from "react";
import react from "../../assets/react.svg";
import { Socket } from "socket.io-client";
import { Message, User } from "../../Types/types";
import Messages from "../Messages/Messages";
import { MdPhone, MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import {
  MsgState,
  fecthMessages,
  setMessages,
} from "../../features/Message/MessageSlice";
import MsgForm from "../MessageForm/MsgForm";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: User;
};

const UsersWapper = (props: Props) => {
  const { socket, selected } = props;
  const { user } = useAppSelector(userState);
  const [upComingMsg, setUpComingMsg] = useState<Message | null>(null);
  const msgContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { conversation } = useAppSelector(MsgState);

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
  //     msgRef.current?.value.length > 0
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
      dispatch(setMessages(upComingMsg));
      setUpComingMsg(null);
    }
  }, [upComingMsg, setMessages, dispatch]);

  return (
    <section className="chatbox-section">
      <nav>
        <div className="display-flex">
          <img
            src={
              typeof selected?.img === "string"
                ? selected?.img
                : selected?.img.image_url
            }
            alt={react}
          />
          <div className="selected-info">
            <h4>{selected.name}</h4>
            <div className="selected-email">{selected.email}</div>
          </div>
        </div>
      </nav>
      <div className="message-container-main" ref={msgContainerRef}>
        <Messages isGroup={false} />
      </div>
      <MsgForm socket={socket} selected={selected} />
    </section>
  );
};

export default UsersWapper;
