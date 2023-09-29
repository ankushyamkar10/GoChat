import React, { useState, useContext } from "react";
import { Group } from "../../Types/types";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import { MdJoinFull, MdPersonAdd, MdSearch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  addParticipant,
  getGroupById,
  groupState,
} from "../../features/Group/GroupSlice";
import { userState } from "../../features/Auth/AuthSlice";
import { handleAddGroupOpen } from "../../features/Modal/ModalSlice";

interface joinGroup {
  id: string;
  code: string;
}

const JoinGroup = () => {
  const [joinGroupData, setJoinGroupData] = useState<joinGroup>({
    id: "",
    code: "",
  });
  const dispatch = useAppDispatch();
  const { id, code } = joinGroupData;
  const { group } = useAppSelector(groupState);
  const { loggedInUser } = useAppSelector(userState);
  const { fetchGroupsMore } = useContext(FetchDataContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setJoinGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(getGroupById(id));
    setJoinGroupData((prev) => ({ ...prev, id: "", code: "" }));
  };

  const handleAddUserToGroup = (groupId: string) => {
    if (loggedInUser) {
      dispatch(addParticipant({ groupId, userId: loggedInUser._id }));

      fetchGroupsMore(loggedInUser._id);
      if (group) dispatch(handleAddGroupOpen(false));
    }
  };

  return (
    <div className="inner-modal-content">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={handleInputChange}
          placeholder="Enter the Id of the group"
          required
        />
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={handleInputChange}
          placeholder="Enter the code"
        />

        <button>
          Find <MdSearch />
        </button>
      </form>

      {group && (
        <div className="result-group">
          <div>
            <img src={group.img} alt={group.img} className="profile-img" />
            <h4>{group.name}</h4>
          </div>
          <div className="join" onClick={() => handleAddUserToGroup(group._id)}>
            Join <MdPersonAdd />
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinGroup;
