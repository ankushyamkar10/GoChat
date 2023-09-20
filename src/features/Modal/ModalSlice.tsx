import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type modalInitial = {
  isOpen: boolean;
};

const initialState: modalInitial = {
  isOpen: false,
};

export const ModalSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    handleOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const ModalState = (state: RootState) => state.modal;
export const { handleOpen } = ModalSlice.actions;
export const ModalReducer = ModalSlice.reducer;
