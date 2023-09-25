import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Group,
  LoginData,
  RegisterData,
  User,
  addUser,
  communication,
  requestAction,
} from "../../Types/types";
import authService from "./AuthService";
import { RootState } from "../../app/store";
import { getCookie } from "../../Utils/Cookies";

const loggedInUser = getCookie("user");

type authInitial = {
  loggedInUser: User | null;
  isError: Boolean;
  isSuccess: Boolean;
  isLoading: Boolean;
  message: string;
};

const initialState: authInitial = {
  loggedInUser: loggedInUser ? loggedInUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk<User, RegisterData>(
  "auth/register",
  async (registerData: RegisterData, thunkAPI) => {
    try {
      return await authService.register(registerData);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const login = createAsyncThunk<User, LoginData>(
  "auth/login",
  async (loginData: LoginData, thunkAPI) => {
    try {
      return await authService.login(loginData);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
      return thunkAPI.rejectWithValue("An error occurred during login.");
    }
  }
);

export const sendChatRequest = createAsyncThunk<User, communication>(
  "auth/sendChatRequest",
  async (data, thunkAPI) => {
    try {
      return await authService.sendChatRequest(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

// remove requests from sender's database and also from recievers end
// so make a scoket request

export const cancelChatRequest = createAsyncThunk<User, communication>(
  "auth/cancelChatRequest",
  async (data, thunkAPI) => {
    try {
      return await authService.cancelChatRequest(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const recieveChatRequest = createAsyncThunk<User, communication>(
  "auth/recieveChatRequest",
  async (data, thunkAPI) => {
    try {
      return await authService.recieveChatRequest(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);
export const updateRequestAndContacts = createAsyncThunk<User, requestAction>(
  "auth/updateRequestAndContacts",
  async (data, thunkAPI) => {
    try {
      return await authService.updateRequestAndContacts(data);
    } catch (e) {
      if (e instanceof Error) {
        const msg = e.message ? e.message : e.name && e.name;
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.loggedInUser = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUser = action.payload;
        state.loggedInUser.isAvtarSet = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.loggedInUser = null;
      })
      .addCase(sendChatRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendChatRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.loggedInUser)
          state.loggedInUser.sentRequests = action.payload.sentRequests;
      })
      .addCase(sendChatRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(recieveChatRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recieveChatRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.loggedInUser)
          state.loggedInUser.recievedRequests = action.payload.recievedRequests;
      })
      .addCase(recieveChatRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(cancelChatRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelChatRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.loggedInUser) {
          state.loggedInUser.sentRequests = action.payload.sentRequests;
          state.loggedInUser.recievedRequests = action.payload.recievedRequests;
        }
      })
      .addCase(cancelChatRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateRequestAndContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRequestAndContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.loggedInUser) {
          state.loggedInUser.contacts = action.payload.contacts;
          state.loggedInUser.sentRequests = action.payload.sentRequests;
          state.loggedInUser.recievedRequests = action.payload.recievedRequests;
        }
      })
      .addCase(updateRequestAndContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedInUser = null;
      });
  },
});

export const userState = (state: RootState) => state.auth;
export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
