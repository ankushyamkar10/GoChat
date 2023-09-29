import { MdGroupAdd } from "react-icons/md";
import { useContext, useState } from "react";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { Group } from "../../Types/types";
import { setSelected } from "../../features/Message/MessageSlice";
import { Socket } from "socket.io-client";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import { handleAddGroupOpen } from "../../features/Modal/ModalSlice";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const GroupsList = (props: Props) => {
  const [search, setSearch] = useState("");
  const { groups } = useContext(FetchDataContext);

  const dispatch = useAppDispatch();

  const handleClick = (group: Group) => {
    dispatch(setSelected(group));
  };
  console.log(groups);

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
      <div
        className="add_grp"
        onClick={() => dispatch(handleAddGroupOpen(true))}
      >
        <MdGroupAdd size={16} />
      </div>
    </section>
  );
};

export default GroupsList;
