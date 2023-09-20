import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Group, User } from "../../Types/types";
import FetchDataService from "./FetchDataService";

type Data = {
  users: User[];
  groups: Group[];
  isError: Boolean;
  isSuccess: Boolean;
  isLoading: Boolean;
  errMsg: string;
  knownUser: User[];
};

const initialState: Data = {
  users: [],
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errMsg: "",
  knownUser: [],
};

export const fetchUsers = createAsyncThunk<User[], User>(
  "data/fetchUsers",
  async (user, thunkAPI) => {
    try {
      return await FetchDataService.fetchUsers(user._id);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const fetchGroups = createAsyncThunk<Group[], User>(
  "data/fetchGroups",
  async (user, thunkAPI) => {
    try {
      return await FetchDataService.fetchGroups(user._id);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUser(state, action) {
      if (state.knownUser.includes(action.payload))
        state.knownUser.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errMsg = action.payload as string;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errMsg = action.payload as string;
      });
  },
});

export const DataState = (state: RootState) => state.data;
export const { addUser } = DataSlice.actions;
export const DataReducer = DataSlice.reducer;
