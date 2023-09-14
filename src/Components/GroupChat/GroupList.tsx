import { MdGroupAdd } from "react-icons/md";
import "../../scss/Group.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { DataState, fetchGroups } from "../../features/FetchData/FetchDataSlice";
import { userState } from "../../features/Auth/AuthSlice";
import { Group } from "../../Types/types";
import { setSelected } from "../../features/Message/MessageSlice";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const GroupsList = (props:Props) => {
  const { groups } = useAppSelector(DataState);
  const { user } = useAppSelector(userState);
  const { socket } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (groups.length == 0) dispatch(fetchGroups(user));
    else {
      groups.forEach((grp) => {
        socket.current?.emit("joinGroup", grp._id);
      });
    }
  }, []);

  const handleClick = (group: Group) => {
    // joinRoom({ user, socket });
    dispatch(setSelected(group));
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
