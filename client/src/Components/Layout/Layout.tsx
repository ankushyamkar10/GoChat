import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";

type Props = {
  children: React.ReactNode; // children is the content of this component, it can be a single element or an array with multiple elements
};

const Layout = ({ children }: Props) => {
  const { user } = useAppSelector(userState);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    } else if (!user.isAvtarSet) window.location.href = "/setAvtar";
  }, []);
  return <div>{children}</div>;
};

export default Layout;
