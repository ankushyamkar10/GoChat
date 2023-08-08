import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {  Message, User } from "../../Types/types";
import messageService from "./MessageService";

// const user = await JSON.parse(localStorage.getItem("user") as string);
// console.log("stringify user", user);

type messageInitial = {
  selected: User | null;
  isError: Boolean;
  isSuccess: Boolean;
  isLoading: Boolean;
  errMsg: string;
  Messages: Message[];
};

const initialState: messageInitial = {
  selected: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errMsg: "",
  Messages: [],
};

type fetchMsgProps = {
  userId: string | undefined;
  selectId: string | undefined;
};

type sendMsgProps = {
  text: string | undefined;
  sender: string | undefined;
  reciever: string | undefined;
};

export const fecthMessages = createAsyncThunk<Message[], fetchMsgProps>(
  "msg/fetchMessages",
  async (fecthMegData, thunkAPI) => {
    try {
      return await messageService.fetchMsgs(fecthMegData);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const sendMessage = createAsyncThunk<Message[], sendMsgProps>(
  "msg/sendMessages",
  async (sendMessageData, thunkAPI) => {
    try {
      return await messageService.sendMsg(sendMessageData);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const MessageSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthMessages.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.Messages = action.payload;
      })
      .addCase(fecthMessages.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errMsg = action.payload as string;
      });
  },
});

export const MsgState = (state: RootState) => state.msg;
export const { setSelected } = MessageSlice.actions;
export const MessageReducer = MessageSlice.reducer;
