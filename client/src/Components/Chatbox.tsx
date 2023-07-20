import { useEffect, useRef, useState } from "react";
import react from "../assets/react.svg";
import { Socket } from "socket.io-client";
import { User } from "../Types/types";

type Props = {
  user?: User;
  socket: Socket;
};

const Chatbox = (props: Props) => {
  const { socket, user } = props;
  const [messages, setMessages] = useState<string | null>(null);

  useEffect(() => {
    socket.on("recieve_msg", (data) => {
      setMessages(data);
      console.log(data);
      
    });
  }, [socket]);

  const msgRef = useRef<HTMLInputElement>(null);

  if (!props.user) {
    return <div className="nochat-div">No Chats</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("send_message", { message: msgRef.current?.value, user });
  };

  return (
    <section className="chatbox-section">
      <nav>
        <img src={react} alt={react} />
        <h4>{user?.name}</h4>
      </nav>
      <div>{ messages}</div>
      <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={msgRef} placeholder="Send Message..." />
        <button>Send</button>
      </form>
    </section>
  );
};

export default Chatbox;
