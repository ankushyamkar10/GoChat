import { useState } from "react";
import GroupsList from "../GroupChat/GroupList";
import UsersList from "../SingleChat/UsersList";
import { Socket } from "socket.io-client";
import Notifications from "../Notifications/Notifications";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Contacts = (props: Props) => {
  const { socket } = props;
  const [tab, setTab] = useState<number>(0);

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
          Notifications
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
