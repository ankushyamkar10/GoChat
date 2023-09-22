import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";

type Props = {
  children: React.ReactNode; // children is the content of this component, it can be a single element or an array with multiple elements
};

const Protect = ({ children }: Props) => {
  const { loggedInUser } = useAppSelector(userState);

  if (!loggedInUser && typeof loggedInUser === null) {
    window.location.href = "/login";
    return;
  } else if (loggedInUser && !loggedInUser.isAvtarSet) {
    window.location.href = "/setAvtar";
  }
  return <div>{children}</div>;
};

export default Protect;
