import { MdGroupAdd } from "react-icons/md";
import "./Group.scss";
import { useEffect } from "react";
import { Group, User } from "../../Types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  DataState,
  fetchGroups,
} from "../../features/FetchData/FetchDataSlice";
import { userState } from "../../features/Auth/AuthSlice";

const GroupsList = () => {
  const { groups } = useAppSelector(DataState);
  const { user } = useAppSelector(userState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) dispatch(fetchGroups(user));
  }, []);

  const handleClick = () => {
    // joinRoom({ user, socket });
    // setSelected(group);
  };

  return (
    <section className="groups_sidebar">
      <ul>
        {groups?.map((group: Group) => {
          return (
            <li key={group._id} onClick={() => handleClick()}>
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
