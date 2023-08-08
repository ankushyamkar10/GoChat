import { useEffect, useState } from "react";
import { fetchUsers } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";
import GroupsList from "./Groups/GroupsList";
import { MdMessage } from "react-icons/md";
// import { HiUser, HiUserGroup } from "react-icons/hi";
// import { MdPhone } from "react-icons/md";

type Props = {
  user: User | null;
  setSelected: (val: User) => void;
};

const UserList = ({ user, setSelected }: Props) => {
  const [tab, setTab] = useState<number>(0);
  const [users, setUsers] = useState<Array<User>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetchUsers(user?._id)
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (user: User) => {
    // joinRoom({ user, socket });
    setSelected(user);
  };
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
          <>
            <ul>
              {users?.map((currUser: User) => {
                return (
                  <li key={currUser._id} onClick={() => handleClick(currUser)}>
                    <img src={currUser.img} alt={currUser.img} />
                    <h4>{currUser.name}</h4>
                  </li>
                );
              })}
            </ul>
            <div className="add_msg">
              <MdMessage size={15} />
            </div>
          </>
        ) : tab == 1 ? (
          <GroupsList user={user} setSelected={setSelected}/>
        ) : null}
      </div>
    </div>
  );
};

export default UserList;
