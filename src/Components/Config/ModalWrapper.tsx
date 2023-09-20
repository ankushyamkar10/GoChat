import { Modal } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelector";
import { DataState, addUser } from "../../features/FetchData/FetchDataSlice";
import { User } from "../../Types/types";
import { ModalState, handleOpen } from "../../features/Modal/ModalSlice";
import "./Config.scss";

type Props = {
  userType: String;
};

const ModalWrapper = ({ userType }: Props) => {
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useAppDispatch();
  let { users } = useAppSelector(DataState);
  const { isOpen } = useAppSelector(ModalState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Gmail address submitted:", formData.email);
  //   dispatch(handleOpen(false));
  // };

  users = users.filter((user) =>
    user.name.toLowerCase().includes(formData.email.toLowerCase())
  );

  console.log(addedUsers);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(handleOpen(false))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <div>
            <h2>Add a User</h2>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Search User here"
              required
            />
          </div>

          {addedUsers.length > 0 && (
            <div>
              <div className="label_list">Selected Users </div>
              <ul className="add_user">
                {addedUsers.map((currUser: User) => {
                  return (
                    <li
                      key={currUser._id}
                      onClick={() => {
                        let temp = addedUsers;
                        temp = temp.filter((user) => user._id !== currUser._id);
                        setAddedUsers(temp);
                      }}
                    >
                      <img
                        src={
                          typeof currUser.img === "string"
                            ? currUser.img
                            : currUser.img.image_url
                        }
                        alt="user image"
                      />
                      <h4>{currUser.name}</h4>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {addedUsers.length !== users.length && (
            <div>
              <div>All Users </div>
              {users.length > 0 && (
                <ul className="add_user">
                  {users?.map((currUser: User) => {
                    if (addedUsers.includes(currUser)) return;
                    return (
                      <li
                        key={currUser._id}
                        onClick={() => {
                          setAddedUsers((prev) => [...prev, currUser]);
                        }}
                      >
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
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
          <div>
            <button type="submit">Add User</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWrapper;
