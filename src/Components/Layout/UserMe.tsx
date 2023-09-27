import { useRef, useState } from "react";
import UseOnClickOutside from "../../Utils/useOnClickOutside";
import { HiDotsVertical } from "react-icons/hi";
import "../../scss/Chat.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { logout, userState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const UserMe = () => {
  const { loggedInUser } = useAppSelector(userState);
  const [show, setShow] = useState<boolean>(false);
  const squareBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickOutsidehandler = () => {
    setShow(false);
  };

  UseOnClickOutside(squareBoxRef, clickOutsidehandler);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="user-me">
      <div className="user-image">
        <img
          src={
            typeof loggedInUser?.img === "string"
              ? loggedInUser?.img
              : loggedInUser?.img?.image_url
          }
          alt="DP"
        />
        <span>{loggedInUser?.name}</span>
      </div>
      <div className="icons" onClick={() => setShow(!show)} ref={squareBoxRef}>
        <HiDotsVertical size={20} />
        {show && (
          <div className="absolute">
            <div className="three_dots">
              <div>Settings</div>
              <div>Profile</div>
              <div onClick={() => handleLogout()}>Logout</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserMe;
