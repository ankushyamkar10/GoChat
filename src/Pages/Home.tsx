import { useEffect, useRef, useContext } from "react";
import Chatbox from "../Components/Layout/Chatbox";
import { Socket, io } from "socket.io-client";
import { backendRoute } from "../Utils/constants";
import "../scss/Chat.scss";
import Contacts from "../Components/Layout/Contacts";
import UserMe from "../Components/Layout/UserMe";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  cancelChatRequest,
  recieveChatRequest,
  updateRequestAndContacts,
  userState,
} from "../features/Auth/AuthSlice";
import ModalWrapper from "../Components/Config/AddUserModal";
import { ModalState } from "../features/Modal/ModalSlice";
import FetchDataContext from "../features/FetchData/FetchDataContext";
import AddGroupModal from "../Components/Config/AddGroupModal";
import { ThemeContext } from "../features/ThemeContext";
import { Message } from "../Types/types";
import { MessageNotificationContext } from "../features/MessageNotificationContext";

const Chat = () => {
  const { loggedInUser } = useAppSelector(userState);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const { isOpenAddUser, isOpenAddGroup } = useAppSelector(ModalState);
  const dispatch = useAppDispatch();
  const { fetchUsersMore, fetchGroupsMore, mappedUsers } =
    useContext(FetchDataContext);
  const { setMessagesNotifications } = useContext(MessageNotificationContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    socket.current = io(backendRoute);

    if (loggedInUser) {
      socket.current.emit("addUser", loggedInUser._id);
      fetchUsersMore(loggedInUser._id);
      fetchGroupsMore(loggedInUser._id);
    }
    localStorage.setItem("selected", "");
  }, []);

  useEffect(() => {
    socket.current?.on(
      "requestAccepted",
      (data: { senderId: string; acceptorId: string }) => {
        dispatch(
          updateRequestAndContacts({
            actionId: data.acceptorId,
            action: "accepted",
          })
        );
      }
    );

    socket.current?.on(
      "requestRejected",
      (data: { senderId: string; rejectorId: string }) => {
        dispatch(
          updateRequestAndContacts({
            actionId: data.rejectorId,
            action: "rejected",
          })
        );
      }
    );

    socket.current?.on("recieveChatRequest", (data) => {
      dispatch(
        recieveChatRequest({
          senderId: data.requestFrom,
          recieverId: data.requestTo,
        })
      );
    });
    socket.current?.on("cancelChatRequest", (data) => {
      dispatch(
        cancelChatRequest({
          senderId: data.requestFrom,
          recieverId: data.requestTo,
          action: "reciever",
        })
      );
    });
    socket.current?.on("recieveMsg", ({ senderId, message }: Message) => {
      console.log(senderId);

      if (localStorage["selected"] !== senderId) {
        console.log(mappedUsers);

        setMessagesNotifications((prev) => [
          ...prev,
          "Message from " +
            (mappedUsers.get(senderId)
              ? mappedUsers.get(senderId)?.name
              : "User") +
            " : " +
            message.text,
        ]);
      }
    });
  }, [socket]);

  if (loggedInUser) {
    return (
      <div className={`theme-${theme}`}>
        {isOpenAddUser && <ModalWrapper socket={socket} />}
        {isOpenAddGroup && <AddGroupModal />}
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
