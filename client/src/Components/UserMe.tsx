import { HiDotsVertical, HiUserGroup } from "react-icons/hi";
import './UserMe.scss'
import { User } from "../Types/types";

type Props = {
    user : User | null;
}

const UserMe = ({user}:Props) => {
  return (
    <div className="user-me">
      <div className="user-image">
        <img src={user?.img} alt="DP" />
      </div>
      <div className="icons">
        <HiUserGroup size={20} />
        <HiDotsVertical size={20} />
      </div>
    </div>
  );
};
export default UserMe
