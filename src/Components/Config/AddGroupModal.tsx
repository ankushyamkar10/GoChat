import React, { useState, useContext } from "react";
import { Modal } from "@mui/material";
import "./Config.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import {
  ModalState,
  handleAddGroupOpen,
} from "../../features/Modal/ModalSlice";
import CreateGroup from "../GroupChat/CreateGroup";
import JoinGroup from "../GroupChat/JoinGroup";

const AddGroupModal = () => {
  const [tab, setTab] = useState(0);
  const { isOpenAddGroup } = useAppSelector(ModalState);
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <Modal
        open={isOpenAddGroup}
        onClose={() => dispatch(handleAddGroupOpen(false))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <div className="tabs ">
            <h5 onClick={() => setTab(0)}>Join group</h5>
            <h5 onClick={() => setTab(1)}>Create group</h5>
          </div>
          {tab === 0 ? <JoinGroup /> : <CreateGroup />}
        </div>
      </Modal>
    </div>
  );
};

export default AddGroupModal;
