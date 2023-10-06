import React, { useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import "./Notifications.scss";
import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  updateRequestAndContacts,
  userState,
} from "../../features/Auth/AuthSlice";
import { User } from "../../Types/types";
import { MessageNotificationContext } from "../../features/MessageNotificationContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Notifications = ({ socket }: Props) => {
  const { mappedUsers } = useContext(FetchDataContext);
  const { loggedInUser } = useAppSelector(userState);
  const { setMessagesNotifications, messagesNotifications } = useContext(
    MessageNotificationContext
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setMessagesNotifications([]);
    };
  });

  useEffect(() => {
    socket.current?.on("requestAccepted", (data) => {
      console.log(data);
    });

    socket.current?.on("requestRejected", (data) => {
      console.log(data);
    });
  });
  const handleAccept = (user: User) => {
    socket.current?.emit("acceptRequest", {
      acceptorId: loggedInUser?._id,
      senderId: user._id,
    });
    setTimeout(
      () =>
        dispatch(
          updateRequestAndContacts({ actionId: user._id, action: "accepted" })
        ),
      2000
    );
  };

  const handleReject = (user: User) => {
    socket.current?.emit("rejectRequest", {
      rejectorId: loggedInUser?._id,
      senderId: user._id,
    });

    setTimeout(
      () =>
        dispatch(
          updateRequestAndContacts({ actionId: user._id, action: "rejected" })
        ),
      2000
    );
  };

  return (
    <div className="notification_list">
      {loggedInUser && loggedInUser.recievedRequests.length > 0 && (
        <section className="recieved-requests">
          {loggedInUser.recievedRequests.map((request) => {
            const user = mappedUsers.get(request);
            return (
              <div className="notification" key={request}>
                <div className="user_info">
                  <img
                    src={
                      user !== undefined
                        ? typeof user.img === "string"
                          ? user.img
                          : user.img.image_url
                        : undefined
                    }
                    alt="user image"
                  />
                  <div>{user?.name}</div>
                </div>

                <div className="action">
                  <div onClick={() => user && handleAccept(user)}>
                    <TiTickOutline />
                  </div>
                  <div onClick={() => user && handleReject(user)}>
                    <MdOutlineCancel />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
      <section className="sent-requests">
        {loggedInUser &&
          loggedInUser.sentRequests.map((request) => {
            const user = mappedUsers.get(request);
            return (
              <div key={user?._id}>
                You sent chat request to {user && user.name}
              </div>
            );
          })}
      </section>
      <section className="sent-recieved">
        {messagesNotifications.map((notification) => (
          <div>{notification}</div>
        ))}
      </section>
    </div>
  );
};

export default Notifications;

//2 sections for recieved requests and sent requests
