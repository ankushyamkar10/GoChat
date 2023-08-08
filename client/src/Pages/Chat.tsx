import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import Chatbox from "../Components/Chatbox";
import { User } from "../Types/types";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";
import "../Components/Chat.scss";
import Contacts from "../Components/Contacts";
import UserMe from "../Components/UserMe";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";

const Chat = () => {
  const { user } = useAppSelector(userState);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<User|null>(null);

  useEffect(() => {
    if (!user) {
      console.log('navigated');
      
      navigate("/login");
    }
    if (!user?.isAvtarSet) navigate("/setAvtar");
    socket.current = io(backendHost);
    socket.current.emit("addUser", user?._id);
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="chats-screen">
        <div>
          <UserMe user={user} />
          <Contacts setSelected={setSelected} user={user} />
        </div>
        <Chatbox selected={selected} user={user} socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
