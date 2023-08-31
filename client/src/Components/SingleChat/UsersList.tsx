import { useEffect } from "react";
import { MdMessage } from "react-icons/md";
import { User } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { DataState, fetchUsers } from "../../features/FetchData/FetchDataSlice";
import { setSelected } from "../../features/Message/MessageSlice";
import { userState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const UsersList = (props: Props) => {
  const socket = { props };
  const { users } = useAppSelector(DataState);
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
  return (
    <>
      <ul className="">
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
  );
};

export default UsersList;
