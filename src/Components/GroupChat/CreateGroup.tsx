import React, { useState, useContext } from "react";
import { createGroupInterface } from "../../Types/types";
import FetchDataContext from "../../features/FetchData/FetchDataContext";
import { MdCancel, MdPersonAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { userState } from "../../features/Auth/AuthSlice";
import { createGroup } from "../../features/Group/GroupSlice";
import { handleAddGroupOpen } from "../../features/Modal/ModalSlice";

const initialState: createGroupInterface = {
  name: "",
  members: [],
  userId: "",
};

const CreateGroup = () => {
  const [createGroupData, setCreateGroupData] =
    useState<createGroupInterface>(initialState);
  const { loggedInUser } = useAppSelector(userState);
  const { mappedUsers, fetchGroupsMore } = useContext(FetchDataContext);
  const dispatch = useAppDispatch();
  const { name, desc, members } = createGroupData;
  const contacts = loggedInUser?.contacts;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCreateGroupData((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="inner-modal-content">
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
  );
};

export default CreateGroup;
