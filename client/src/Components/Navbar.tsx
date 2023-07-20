import { MdPhone, MdVideoCall } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="nav">
      <div>GoChat</div>
      <div className="">
        <MdPhone color="white" />
        <MdVideoCall color="white" />
      </div>
    </div>
  );
};

export default Navbar;
