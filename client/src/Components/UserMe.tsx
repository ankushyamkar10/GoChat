import { useRef, useState } from "react";
import UseOnClickOutside from "../Utils/useOnClickOutside";
import {HiDotsVertical} from 'react-icons/hi'
import "./Chat.scss";
import { useAppSelector } from "../hooks/useTypedSelector";
import { userState } from "../features/Auth/AuthSlice";


const UserMe = () => {
  const {user} = useAppSelector(userState)
  const [show, setShow] = useState<Boolean>(false);
  const squareBoxRef = useRef<HTMLDivElement>(null);

  const clickOutsidehandler = () => {
    setShow(false)
    
  };

  UseOnClickOutside(squareBoxRef, clickOutsidehandler);

  return (
    <div className="user-me">
      <div className="user-image">
        <img src={user?.img} alt="DP" />
      </div>
      <div className="icons" onClick={() => setShow(!show)}  ref={squareBoxRef}>
        <HiDotsVertical size={20} />
        {show && (
        <div className="absolute">
          <div className="three_dots">
            <div>Settings</div>
            <div>Profile</div>
            <div>Logout</div>
          </div>
        </div>
      )}
      </div>
      
    </div>
  );
};
export default UserMe;
