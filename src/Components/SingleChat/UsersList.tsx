import { useContext, useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { User } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setSelected } from "../../features/Message/MessageSlice";
import { userState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { handleAddUserOpen } from "../../features/Modal/ModalSlice";
import { Socket } from "socket.io-client";
import FetchDataContext from "../../features/FetchData/FetchDataContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const UsersList = ({ socket }: Props) => {
  const [search, setSearch] = useState("");
  const { loggedInUser } = useAppSelector(userState);
  const { mappedUsers } = useContext(FetchDataContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser) navigate("/login");
  }, []);

  const handleClick = (user: User) => {
    dispatch(setSelected(user));
  };

  const data =
    loggedInUser &&
    loggedInUser.contacts.filter((user: string) => {
      const mappedUser = mappedUsers.get(user);
      if (mappedUser)
        return mappedUser.name.toLowerCase().includes(search.toLowerCase());
      return false;
    });

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
        {data?.map((user: string) => {
          const currUser = mappedUsers.get(user);
          if (currUser)
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
          dispatch(handleAddUserOpen(true));
        }}
      >
        <MdMessage size={15} />
      </div>
    </>
  );
};

export default UsersList;
