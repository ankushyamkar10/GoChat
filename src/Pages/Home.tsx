import { useEffect, useRef, useContext } from "react";
import Chatbox from "../Components/Layout/Chatbox";
import { Socket, io } from "socket.io-client";
import { backendRoute } from "../Utils/constants";
import "../scss/Chat.scss";
import Contacts from "../Components/Layout/Contacts";
import UserMe from "../Components/Layout/UserMe";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import {
  recieveChatRequest,
  sendChatRequest,
  updateRequestAndContacts,
  userState,
} from "../features/Auth/AuthSlice";
import ModalWrapper from "../Components/Config/ModalWrapper";
import { ModalState } from "../features/Modal/ModalSlice";
import FetchDataContext from "../features/FetchData/FetchDataContext";

const Chat = () => {
  const { loggedInUser } = useAppSelector(userState);
  const socket: React.MutableRefObject<Socket | undefined> = useRef<Socket>();
  const { isOpenAddUser } = useAppSelector(ModalState);
  const dispatch = useAppDispatch();

  const { fetchUsersMore, fetchGroupsMore, mappedUsers } =
    useContext(FetchDataContext);

  useEffect(() => {
    socket.current = io(backendRoute);

    if (loggedInUser) {
      socket.current.emit("addUser", loggedInUser._id);
      fetchUsersMore(loggedInUser._id);
      fetchGroupsMore(loggedInUser._id);
    }
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
      console.log(data.requestFrom);

      dispatch(
        recieveChatRequest({
          senderId: data.requestFrom,
          recieverId: data.requestTo,
        })
      );
    });
  }, [socket]);

  if (loggedInUser) {
    return (
      <div>
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
