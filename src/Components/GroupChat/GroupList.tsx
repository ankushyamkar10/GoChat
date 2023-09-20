import { MdGroupAdd } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { DataState } from "../../features/FetchData/FetchDataSlice";
import { Group } from "../../Types/types";
import { setSelected } from "../../features/Message/MessageSlice";
import { Socket } from "socket.io-client";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const GroupsList = (props: Props) => {
  const [search, setSearch] = useState("");
  const { groups } = useAppSelector(DataState);
  const dispatch = useAppDispatch();

  const handleClick = (group: Group) => {
    dispatch(setSelected(group));
  };

  return (
    <section className="groups_sidebar">
      <div className="input-search">
        <input
          type="text"
          className="search-users"
          name="name"
          value={search}
          placeholder="Search a Group"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
