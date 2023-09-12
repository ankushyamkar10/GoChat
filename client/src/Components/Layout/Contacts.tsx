import { useState } from "react";
import GroupsList from "../GroupChat/GroupList";
import UsersList from "../SingleChat/UsersList";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const Contacts = (props: Props) => {
  const { socket } = props;
  const [tab, setTab] = useState<number>(0);

  return (
    <div>
      <div className="user-groups-tabs">
        <div
          className={`users-tab ${tab == 0 && "bb"}`}
          onClick={() => setTab(0)}
        >
          Users
        </div>
        <div
          className={`groups-tab ${tab == 1 && "bb"}`}
          onClick={() => setTab(1)}
        >
          Groups
        </div>
        <div
          className={`calls-tab ${tab == 2 && "bb"}`}
          onClick={() => setTab(2)}
        >
          Calls
        </div>
      </div>
      <div className="users_list">
        {tab == 0 ? (
          <UsersList socket={socket} />
        ) : tab == 1 ? (
          <GroupsList socket={socket}/>
        ) : null}
      </div>
    </div>
  );
};

export default Contacts;
