import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type modalInitial = {
  isOpenAddUser: boolean;
  isOpenAddGroup: boolean;
};

const initialState: modalInitial = {
  isOpenAddUser: false,
  isOpenAddGroup: false,
};

export const ModalSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    handleAddUserOpen(state, action) {
      state.isOpenAddUser = action.payload;
    },
    handleAddGroupOpen(state, action) {
      state.isOpenAddGroup = action.payload;
    },
  },
});

export const ModalState = (state: RootState) => state.modal;
export const { handleAddUserOpen, handleAddGroupOpen } = ModalSlice.actions;
export const ModalReducer = ModalSlice.reducer;
