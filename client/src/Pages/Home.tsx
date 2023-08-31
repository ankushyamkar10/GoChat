import { useEffect, useRef } from "react";
import Chatbox from "../Components/Layout/Chatbox";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";
import "../scss/Chat.scss";
import Contacts from "../Components/Layout/Contacts";
import UserMe from "../Components/Layout/UserMe";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";

const Chat = () => {
  const { user } = useAppSelector(userState);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();


  useEffect(() => {
    socket.current = io(backendHost);
    socket.current.emit("addUser", user?._id);

  }, []);

  if (user) {
    return (
      <div>
        {/* <Navbar /> */}
        <div className="chats-screen">
          <div className="contacts">
            <UserMe />
            <Contacts socket={socket} />
          </div>
          <Chatbox socket={socket} />
        </div>
      </div>
    );
  }
};
export default Chat;
