import { useEffect, useRef, useState } from "react";
import react from "../assets/react.svg";
import { Socket } from "socket.io-client";
import { Message, User } from "../Types/types";
import axios from "axios";
import { sendMsgHost } from "../Utils/constants";
import Messages from "./Messages";
import { fetchMsgs } from "../Utils/constants";
import { MdPhone, MdVideoCall } from "react-icons/md";
import {HiDotsVertical} from 'react-icons/hi'

type Props = {
  selected: User | null;
  user: User | null;
  socket: React.MutableRefObject<Socket | undefined>;
};

const Chatbox = (props: Props) => {
  const { user, selected, socket } = props;
  const [messages, setMessages] = useState<Array<Message>>();
  const [upComingMsg, setUpComingMsg] = useState<Message | null>(null);
  const msgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMsgs(user?._id, selected?._id)
      .then((res) => setMessages(res))
      .catch((err) => console.log(err));
  }, [user, selected, setMessages, upComingMsg]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.current?.emit("sendMsg", {
      text: msgRef.current?.value,
      sender: user?._id,
      recieverId: selected?._id,
    });

    const response = await axios.post(sendMsgHost, {
      text: msgRef.current?.value,
      sender: user?._id,
      reciever: selected?._id,
    });
    if (response.data) {
      let newMsgArray: Message[];
      if (!messages) {
        newMsgArray = [response.data];
      } else {
        newMsgArray = [...messages];
        newMsgArray.push(response.data);
      }
      setMessages(newMsgArray);
    }
    if (msgRef.current?.value) {
      msgRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.current?.on("recieveMsg", (data: Message) => {
      const new_msg = {
        message: data.message,
        isSenderMe: false,
      };
      setUpComingMsg(new_msg);
    });
  });

  useEffect(() => {
    if (upComingMsg) {
      const newMsgArray = messages;

      const new_msg = {
        message: upComingMsg.message,
        isSenderMe: false,
      };
      newMsgArray?.push(new_msg);
      setMessages(newMsgArray); 
      setUpComingMsg(null);
    }
  }, [upComingMsg, setMessages, messages]);

  if (!selected) {
    return <div className="nochat-div">No Chats</div>;
  }

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
      <Messages messages={messages} />
      <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={msgRef} placeholder="Send Message..." />
        <button>Send</button>
      </form>
    </section>
  );
};

export default Chatbox;
