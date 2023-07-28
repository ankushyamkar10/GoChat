import { useEffect, useState } from "react";
import { fetchUsers } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";

type Props = {
  user: User | null;
  setSelected: (val: User) => void;
};

const UserList = ({ user, setSelected }: Props) => {
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
    <div className="userslist">
      <ul>
        {users?.map((currUser: User) => {
          return (
            <li key={currUser._id} onClick={() => handleClick(currUser)}>
              <img
                src={currUser.img}
                alt={currUser.img}
              />
              <h4>{currUser.name}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
