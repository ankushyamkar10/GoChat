import { useRef, useState, useContext } from "react";
import UseOnClickOutside from "../../Utils/useOnClickOutside";
import { HiDotsVertical } from "react-icons/hi";
import "../../scss/Chat.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { logout, userState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../features/ThemeContext";
import { MdDarkMode, MdLight, MdSunny } from "react-icons/md";

const UserMe = () => {
  const { loggedInUser } = useAppSelector(userState);
  const [show, setShow] = useState<boolean>(false);
  const { theme, handleTheme } = useContext(ThemeContext);
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
      <div className="icons" ref={squareBoxRef}>
        <div className="df">
          <div onClick={handleTheme}>
            {theme === "light" ? (
              <MdSunny size={20} on />
            ) : (
              <MdDarkMode size={20} />
            )}
          </div>
          <div onClick={() => setShow(!show)}>
            <HiDotsVertical size={20} />
          </div>
        </div>
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
