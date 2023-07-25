import { User } from "../Types/types";
// import { joinRoom } from "../Utils/joinRoom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../Utils/constants";

type Props = {
  setSelected: (val: User) => void;
  user : User | null
};

const UsersList: React.FC<Props> = ({ setSelected,user }) => {
  const [users, setUsers] = useState<Array<User>>();

  useEffect(() => {
    fetchUsers(user?._id)
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));    
  }, []);

  const handleClick = (user: User) => {
    // joinRoom({ user, socket });
    setSelected(user);
  };
  

  return (
    <aside className="userslist-aside">
      <ul>
        {users?.map((user: User) => {
          return (
            <li key={user._id} onClick={() => handleClick(user)}>
              <img
                src={user.img}
                alt={user.img}
                style={{ borderRadius: "1rem" }}
              />
              <h4>{user.name}</h4>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default UsersList;
