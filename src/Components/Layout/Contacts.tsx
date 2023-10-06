import { useState, useContext } from "react";
import GroupsList from "../GroupChat/GroupList";
import UsersList from "../SingleChat/UsersList";
import { Socket } from "socket.io-client";
import Notifications from "../Notifications/Notifications";
import { MessageNotificationContext } from "../../features/MessageNotificationContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Contacts = (props: Props) => {
  const { socket } = props;
  const [tab, setTab] = useState<number>(0);
  const { messagesNotifications } = useContext(MessageNotificationContext);

  return (
    <div>
      <div className="user-groups-tabs">
        <div className={` ${tab == 0 && "bb"}`} onClick={() => setTab(0)}>
          Users
        </div>
        <div className={` ${tab == 1 && "bb"}`} onClick={() => setTab(1)}>
          Groups
        </div>
        <div className={` ${tab == 2 && "bb"}`} onClick={() => setTab(2)}>
          Alerts
          {messagesNotifications.length > 0 && (
            <span
              style={{
                padding: "0.15rem 0.5rem",
                background: "red",
                borderRadius: "100%",
                marginLeft: ".5rem",
                fontSize: "10px",
              }}
            >
              {messagesNotifications.length}
            </span>
          )}
        </div>
      </div>

      <div className="contacts_list">
        {tab == 0 ? (
          <UsersList socket={socket} />
        ) : tab == 1 ? (
          <GroupsList socket={socket} />
        ) : (
          <Notifications socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Contacts;
