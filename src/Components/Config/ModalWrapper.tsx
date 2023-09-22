import { Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelector";
import { User } from "../../Types/types";
import { ModalState, handleAddUserOpen } from "../../features/Modal/ModalSlice";
import "./Config.scss";
import { userState } from "../../features/Auth/AuthSlice";
import { MdPersonAdd } from "react-icons/md";
import { Socket } from "socket.io-client";
import FetchDataContext from "../../features/FetchData/FetchDataContext";

type Props = {
  socket: React.MutableRefObject<Socket | undefined>;
};

const ModalWrapper = ({ socket }: Props) => {
  const [name, setName] = useState("");
  // const { users } = useAppSelector(DataState);
  const { users } = useContext(FetchDataContext);
  const { isOpenAddUser } = useAppSelector(ModalState);
  const { loggedInUser } = useAppSelector(userState);

  const filteredContacts: User[] = users.filter((curr: User) => {
    return !loggedInUser?.contacts.find((one: User) => {
      return curr._id === one._id;
    });
  });

  const data = filteredContacts.filter((user: User) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  ) as User[];

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleAddChatRequest = (recieverId: string) => {
    socket.current?.emit("sendChatRequest", {
      requestFrom: loggedInUser?._id,
      requestTo: recieverId,
    });
  };

  return (
    <>
      <Modal
        open={isOpenAddUser}
        onClose={() => dispatch(handleAddUserOpen(false))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <h2>Add a User</h2>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Search User here"
          />

          <div>All Users </div>
          {data.length > 0 && (
            <ul className="add_user">
              {data?.map((currUser) => {
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
                    <div
                      className="send_request"
                      onClick={() => {
                        console.log("sent to", currUser.name);
                        handleAddChatRequest(currUser._id);
                      }}
                    >
                      <MdPersonAdd />
                      {/* <MdCancel /> */}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalWrapper;
