import React, { useState, useContext } from "react";
import { Modal } from "@mui/material";
import "./Config.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  ModalState,
  handleAddGroupOpen,
} from "../../features/Modal/ModalSlice";
import { userState } from "../../features/Auth/AuthSlice";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import { MdCancel, MdPersonAdd } from "react-icons/md";
import { createGroup } from "../../features/Group/GroupSlice";

interface joinGroup {
  id: string;
  code: string;
}

interface createGroupInterface {
  name: string;
  desc?: string;
  members: Array<string>;
}

const initialState: createGroupInterface = {
  name: "",
  members: [],
};

const AddGroupModal = () => {
  const [joinGroupData, setJoinGroupData] = useState<joinGroup>({
    id: "",
    code: "",
  });
  const [createGroupData, setCreateGroupData] =
    useState<createGroupInterface>(initialState);
  const [tab, setTab] = useState(1);

  const { isOpenAddGroup } = useAppSelector(ModalState);
  const { mappedUsers, fetchGroupsMore } = useContext(FetchDataContext);
  const { loggedInUser } = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const contacts = loggedInUser?.contacts;
  const { name, desc, members } = createGroupData;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCreateGroupData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(typeof members);

  const handleCreateGroup = () => {
    if (name && loggedInUser) {
      console.log(members);
      dispatch(createGroup({ name, desc, members, userId: loggedInUser._id }));
      setCreateGroupData(initialState);
      fetchGroupsMore(loggedInUser._id);
      setTimeout(() => {
        dispatch(handleAddGroupOpen(false));
      }, 500);
    }
    return;
  };

  return (
    <Modal
      open={isOpenAddGroup}
      onClose={() => dispatch(handleAddGroupOpen(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-content">
        {tab == 0 ? (
          <div>
            <h2>Create a group</h2>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Name your group"
              required
            />
            <input
              type="text"
              id="desc"
              name="desc"
              value={desc}
              onChange={handleInputChange}
              placeholder="Add description"
            />

            {members.length > 0 && (
              <div>
                <h5>Selected Contacts</h5>
                <ul className="add_user">
                  {members.map((member: string) => {
                    const currUser = mappedUsers.get(member);
                    if (currUser)
                      return (
                        <li key={currUser._id}>
                          <div>
                            <img
                              src={
                                typeof currUser.img === "string"
                                  ? currUser.img
                                  : currUser.img.image_url
                              }
                              alt="user image"
                            />
                            <div className="user_name">
                              <h4>{currUser.name}</h4>
                            </div>
                          </div>
                          <div className="send_request"></div>
                        </li>
                      );
                  })}
                </ul>
              </div>
            )}

            <h5>Add Contacts</h5>

            {contacts && contacts.length > 0 && (
              <ul className="add_user">
                {contacts.map((contact: string) => {
                  const currUser = mappedUsers.get(contact);
                  if (currUser)
                    return (
                      <li key={currUser._id}>
                        <div>
                          <img
                            src={
                              typeof currUser.img === "string"
                                ? currUser.img
                                : currUser.img.image_url
                            }
                            alt="user image"
                          />
                          <div className="user_name">
                            <h4>{currUser.name}</h4>
                          </div>
                        </div>
                        <div className="send_request">
                          {members.includes(currUser._id) ? (
                            <div
                              onClick={() => {
                                const temp = members.filter(
                                  (member) => member !== currUser._id
                                );
                                setCreateGroupData((prev) => ({
                                  ...prev,
                                  members: temp,
                                }));
                              }}
                            >
                              <MdCancel />
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                setCreateGroupData((prev) => ({
                                  ...prev,
                                  members: [...members, currUser._id],
                                }))
                              }
                            >
                              <MdPersonAdd />
                            </div>
                          )}
                        </div>
                      </li>
                    );
                })}
              </ul>
            )}
            <button onClick={handleCreateGroup}>Create</button>
          </div>
        ) : (
          <div>Join Group</div>
        )}
      </div>
    </Modal>
  );
};

export default AddGroupModal;
