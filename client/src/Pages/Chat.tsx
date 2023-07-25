import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import UsersList from "../Components/UsersList";
import Chatbox from "../Components/Chatbox";
import { User } from "../Types/types";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";

const Chat = () => {
  const currUser: string | null = localStorage.getItem("user");
  const user: User  = currUser &&  JSON.parse(currUser)
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<User>();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    socket.current = io(backendHost);
    socket.current.emit("addUser", user?._id);
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="chats-screen">
        <div className="chats-screen-div" style={{ marginTop: "3.3rem" }}>
          <UsersList setSelected={setSelected} user={user} />
          <Chatbox
            selected={selected ? selected : undefined}
            user={user}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
