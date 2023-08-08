import { MdGroupAdd } from "react-icons/md";
import "./Group.scss";
import { useState, useEffect } from "react";
import { Group, User } from "../../Types/types";
import { fetchGroups } from "../../Utils/constants";

type Props = {
  user: User | null;
  setSelected: (val: User) => void;
};

const GroupsList = ({user}: Props) => {
  const [groups, setGroups] = useState<Group[] | null>(null);

  useEffect(() => {
    fetchGroups(user?._id)
      .then((res) => {
        setGroups(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClick = (group: Group) => {
    // joinRoom({ user, socket });
    // setSelected(group);
  };

  return (
    <section className="groups_sidebar">
      <ul>
        {groups?.map((group: Group) => {
          return (
            <li key={group._id} onClick={() => handleClick(group)}>
              <img src={group.img} alt={group.img} />
              <h4>{group.name}</h4>
            </li>
          );
        })}
      </ul>
      <div className="add_grp">
        <MdGroupAdd size={16} />
      </div>
    </section>
  );
};

export default GroupsList;
