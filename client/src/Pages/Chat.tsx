import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import Chatbox from "../Components/Chatbox";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";
import "../Components/Chat.scss";
import Contacts from "../Components/Contacts";
import UserMe from "../Components/UserMe";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";

const Chat = () => {
  const { user } = useAppSelector(userState);
  // const {selected,Messages} = useAppSelector(MsgState)
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("navigated");
      navigate("/login");
    } else {
      if (!user.isAvtarSet) navigate("/setAvtar");
      socket.current = io(backendHost);
      socket.current.emit("addUser", user?._id);
    }
  }, []);
  if (user) {
    return (
      <div>
        {/* <Navbar /> */}
        <div className="chats-screen">
          <div>
            <UserMe />
            <Contacts />
          </div>
          <Chatbox socket={socket} />
        </div>
      </div>
    );
  }
};
export default Chat;
