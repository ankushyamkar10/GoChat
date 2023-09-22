import { useEffect, useRef, useContext } from "react";
import Chatbox from "../Components/Layout/Chatbox";
import { Socket, io } from "socket.io-client";
import { backendHost } from "../Utils/constants";
import "../scss/Chat.scss";
import Contacts from "../Components/Layout/Contacts";
import UserMe from "../Components/Layout/UserMe";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";
import ModalWrapper from "../Components/Config/ModalWrapper";
import { ModalState } from "../features/Modal/ModalSlice";
import FetchDataContext from "../features/FetchData/FetchDataContext";

const Chat = () => {
  const { loggedInUser } = useAppSelector(userState);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const { isOpenAddUser } = useAppSelector(ModalState);

  const { fetchUsersMore, fetchGroupsMore } = useContext(FetchDataContext);

  useEffect(() => {
    socket.current = io(backendHost);
    socket.current.emit("addUser", loggedInUser?._id);
    if (loggedInUser) {
      fetchUsersMore(loggedInUser._id);
      fetchGroupsMore(loggedInUser._id);
    }
  }, []);

  useEffect(() => {
    socket.current?.on("requestAccepted", (data) => {
      console.log(data);
    });

    socket.current?.on("requestRejected", (data) => {
      console.log(data);
    });
  });

  if (loggedInUser) {
    return (
      <div>
        {/* <Navbar /> */}
        {isOpenAddUser && <ModalWrapper socket={socket} />}
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
