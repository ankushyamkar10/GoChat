import { User } from "../Types/types";
import UserList from "./UserList";
import UserMe from "./UserMe";

type Props = {
  setSelected: (val: User) => void;
  user: User | null;
};

const Contacts: React.FC<Props> = ({ setSelected, user }) => {

  return (
    <div className="contacts">
      <UserMe user={user}/>
      <UserList setSelected={setSelected} user={user}/>
    </div>
  );
};

export default Contacts;
