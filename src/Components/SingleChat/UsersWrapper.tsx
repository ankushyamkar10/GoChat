import { useContext, useEffect, useRef, useState } from "react";
import react from "../../assets/react.svg";
import { Socket } from "socket.io-client";
import { Message, User } from "../../Types/types";
import Messages from "../Messages/Messages";
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
  const { socket } = props;
  const { selected } = useAppSelector(MsgState);
  const { loggedInUser } = useAppSelector(userState);
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
    if (loggedInUser && selected) {
      const msgArg = {
        userId: loggedInUser._id,
        selectedId: selected._id,
      };
      dispatch(fecthMessages(msgArg));
      console.log("fetching");
    }
  }, [selected]);

  console.log(selected?.name);

  useEffect(() => {
    socket.current?.on("recieveMsg", (data: Message) => {
      const new_msg = {
        message: data.message,
        isSenderMe: false,
        senderId: data.senderId,
        recieverId: data.recieverId,
      };
      if (selected && loggedInUser)
        if (
          loggedInUser?._id === data.senderId ||
          (localStorage["selected"] === data.senderId &&
            loggedInUser?._id === data.recieverId)
        ) {
          setUpComingMsg(new_msg);
          console.log(
            data.recieverId === loggedInUser?._id,
            loggedInUser?._id === data.senderId
          );
          console.log(data.senderId === selected._id);
          console.log(selected.name, data.senderId);
        }
    });
  }, [socket.current]);

  useEffect(() => {
    if (upComingMsg) {
      dispatch(setMessages(upComingMsg));
      setUpComingMsg(null);
      console.log("upcomig is true");
    }
  }, [upComingMsg]);

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
            <h4>{selected?.name}</h4>
            {/* <div className="selected-email">{selected.email}</div> */}
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
