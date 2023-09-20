import { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { User } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { DataState, fetchUsers } from "../../features/FetchData/FetchDataSlice";
import { setSelected } from "../../features/Message/MessageSlice";
import { userState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { handleOpen } from "../../features/Modal/ModalSlice";

const UsersList = () => {
  const [search, setSearch] = useState("");
  let { users } = useAppSelector(DataState);
  const { user } = useAppSelector(userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
    else dispatch(fetchUsers(user));
  }, []);

  const handleClick = (user: User) => {
    dispatch(setSelected(user));
  };

  users = users.filter((user: User) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ul className="">
        <div className="input-search">
          <input
            type="text"
            className="search-users"
            name="name"
            value={search}
            placeholder="Search a User"
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {users?.map((currUser: User) => {
          return (
            <li key={currUser._id} onClick={() => handleClick(currUser)}>
              <img
                src={
                  typeof currUser.img === "string"
                    ? currUser.img
                    : currUser.img.image_url
                }
                alt="user image"
              />
              <h4>{currUser.name}</h4>
            </li>
          );
        })}
      </ul>
      <div
        className="add_msg"
        onClick={() => {
          dispatch(handleOpen(true));
        }}
      >
        <MdMessage size={15} />
      </div>
    </>
  );
};

export default UsersList;
