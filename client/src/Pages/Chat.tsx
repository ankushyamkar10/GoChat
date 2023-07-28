import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import UsersList from "../Components/Contacts";
import Chatbox from "../Components/Chatbox";
import { User } from "../Types/types";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";
import '../Components/Chat.scss'

const Chat = () => {
  const currUser: string | null = localStorage.getItem("user");
  const user: User = currUser && JSON.parse(currUser);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<User>();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!user.isAvtarSet) navigate("/setAvtar");
    socket.current = io(backendHost);
    socket.current.emit("addUser", user?._id);
  }, [user]);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="chats-screen">
        <div className="chats-screen-div">
          <UsersList setSelected={setSelected} user={user} />
          <Chatbox selected={selected} user={user} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
