import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import UsersList from "../Components/UsersList";
import Chatbox from "../Components/Chatbox";
// import { joinRoom } from "../Utils/joinRoom";
import { User } from "../Types/types";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/");
socket.on("connect", () => {
  console.log(socket.id, "connected");
});

const Chat = () => {
  const currUser: string | null = localStorage.getItem("user");
  const user: User | null = currUser ? JSON.parse(currUser) : null;

  const navigate = useNavigate();
  const [selected, setSelected] = useState<User>();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    // joinRoom({ user, socket });
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="chats-screen">
        <div className="chats-screen-div" style={{ marginTop: "3.3rem" }}>
          <UsersList setSelected={setSelected} socket={socket} />
          <Chatbox user={selected ? selected : undefined} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
