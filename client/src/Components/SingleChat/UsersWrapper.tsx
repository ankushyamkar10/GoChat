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
  fecthMessages,
  sendMessage,
  setMessages,
} from "../../features/Message/MessageSlice";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
  selected: User;
};

const UsersWapper = (props: Props) => {
  const { socket, selected } = props;
  const { user } = useAppSelector(userState);
  const [upComingMsg, setUpComingMsg] = useState<Message | null>(null);
  const msgRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && selected) {
      const msgArg = {
        userId: user._id,
        selectedId: selected._id,
      };
      dispatch(fecthMessages(msgArg));
    }
  }, [user, selected, fecthMessages, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      user &&
      selected &&
      msgRef.current?.value &&
      msgRef.current?.value.length > 0
    ) {
      socket.current?.emit("sendMsg", {
        text: msgRef.current.value,
        sender: user._id,
        recieverId: selected._id,
      });

      const msgArg = {
        text: msgRef.current.value,
        sender: user._id,
        reciever: selected._id,
      };

      dispatch(sendMessage(msgArg));

      msgRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.current?.on("recieveMsg", (data: Message) => {
      const new_msg = {
        message: data.message,
        isSenderMe: false,
      };
      console.log(data)
      setUpComingMsg(new_msg);
    });
  });

  useEffect(() => {
    if (upComingMsg) {
      const new_msg: Message = {
        message: upComingMsg.message,
        isSenderMe: false,
      };

      dispatch(setMessages(new_msg));
      setUpComingMsg(null);
    }
  }, [upComingMsg, setMessages, dispatch]);

  return (
    <section className="chatbox-section">
      <nav>
        <div className="display-flex">
          <img src={selected.img} alt={react} />
          <div className="selected-info">
            <h4>{selected.name}</h4>
            <div className="selected-email">{selected.email}</div>
          </div>
        </div>
        <div className="options-icons">
          <MdPhone size={18} />
          <MdVideoCall size={18} />
          <HiDotsVertical size={18} />
        </div>
      </nav>
      <Messages />
      <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={msgRef} placeholder="Send Message..." />
        <button>Send</button>
      </form>
    </section>
  );
};

export default UsersWapper;
