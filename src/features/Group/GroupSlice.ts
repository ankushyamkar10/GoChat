import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Group,
  createGroupInterface,
  leaveGroupInterface,
} from "../../Types/types";
import groupService from "./GroupService";
import { RootState } from "../../app/store";

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

export const getGroupById = createAsyncThunk<Group, string>(
  "group/getGroup",
  async (groupId, thunkAPI) => {
    try {
      return await groupService.getGroupById(groupId);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const addParticipant = createAsyncThunk<
  Group,
  { groupId: string; userId: string }
>("group/addParticipant", async ({ groupId, userId }, thunkAPI) => {
  try {
    return await groupService.addParticipant(groupId, userId);
  } catch (e) {
    if (e instanceof Error) {
      const msg = e.message ? e.message : e.name && e.name;
      return thunkAPI.rejectWithValue(msg);
    }
  }
});

export const GroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroupById.fulfilled, (state, action) => {
        if (action.payload) state.group = action.payload;
      })
      .addCase(getGroupById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.group = null;
      })
      .addCase(addParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        if (action.payload) state.group = action.payload;
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.group = null;
      });
  },
});

export const groupState = (state: RootState) => state.group;
const groupReducer = GroupSlice.reducer;
export default groupReducer;
