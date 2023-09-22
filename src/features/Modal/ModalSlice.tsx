import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type modalInitial = {
  isOpenAddUser: boolean;
};

const initialState: modalInitial = {
  isOpenAddUser: false,
};

export const ModalSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    handleAddUserOpen(state, action) {
      state.isOpenAddUser = action.payload;
    },
  },
});

export const ModalState = (state: RootState) => state.modal;
export const { handleAddUserOpen } = ModalSlice.actions;
export const ModalReducer = ModalSlice.reducer;
