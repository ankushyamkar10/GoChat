import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";
import GroupsList from "./Groups/GroupsList";
import { MdMessage } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { DataState, fetchUsers } from "../features/FetchData/FetchDataSlice";
import { userState } from "../features/Auth/AuthSlice";
import { setSelected } from "../features/Message/MessageSlice";

const UserList = () => {
  const { user } = useAppSelector(userState);
  const { users } = useAppSelector(DataState);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else dispatch(fetchUsers(user));
  }, []);

  const handleClick = (user: User) => {
    dispatch(setSelected(user));
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
          <GroupsList  />
        ) : null}
      </div>
    </div>
  );
};

export default UserList;
