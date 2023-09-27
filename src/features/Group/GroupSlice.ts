import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Group,
  createGroupInterface,
  leaveGroupInterface,
} from "../../Types/types";
import groupService from "./GroupService";

type groupInitial = {
  group: Group | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: groupInitial = {
  group: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createGroup = createAsyncThunk<Group, createGroupInterface>(
  "group/createGroup",
  async (group, thunkAPI) => {
    try {
      return await groupService.createGroup(group);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);
export const leaveGroup = createAsyncThunk<Group, leaveGroupInterface>(
  "group/createGroup",
  async (group, thunkAPI) => {
    try {
      return await groupService.leaveGroup(group);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const GroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase()
  },
});

const groupReducer = GroupSlice.reducer;
export default groupReducer;
