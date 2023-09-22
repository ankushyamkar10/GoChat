// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../app/store";
// import { Group, User, Users } from "../../Types/types";
// import FetchDataService from "./FetchDataService";

// interface UniqueId {
//   _id: string;
// }

// type MappedUsers = {
//   [user in keyof UniqueId]: User;
// };

// type Data = {
//   mappedUsers: Array<MappedUsers>;
//   users: User[];
//   groups: Group[];
//   anotherUser: User | null;
//   isError: Boolean;
//   isSuccess: Boolean;
//   isLoading: Boolean;
//   errMsg: string;
// };

// const initialState: Data = {
//   mappedUsers: [],
//   users: [],
//   groups: [],
//   anotherUser: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   errMsg: "",
// };

// export const fetchUsers = createAsyncThunk<User[], string>(
//   "data/fetchUsers",
//   async (user_id, thunkAPI) => {
//     try {
//       return await FetchDataService.fetchUsers(user_id);
//     } catch (e) {
//       if (e instanceof Error) {
//         const msg = e.message ? e.message : e.name && e.name;
//         return thunkAPI.rejectWithValue(msg);
//       }
//     }
//   }
// );

// export const fetchGroups = createAsyncThunk<Group[], string>(
//   "data/fetchGroups",
//   async (user_id, thunkAPI) => {
//     try {
//       return await FetchDataService.fetchGroups(user_id);
//     } catch (e) {
//       if (e instanceof Error) {
//         const msg = e.message ? e.message : e.name && e.name;
//         return thunkAPI.rejectWithValue(msg);
//       }
//     }
//   }
// );
// // export const fecthUser = createAsyncThunk<User, string>(
// //   "data/fetchUser",
// //   async (user_id, thunkAPI) => {
// //     try {
// //       return await FetchDataService.fecthUser(user_id);
// //     } catch (e) {
// //       if (e instanceof Error) {
// //         const msg = e.message ? e.message : e.name && e.name;
// //         return thunkAPI.rejectWithValue(msg);
// //       }
// //     }
// //   }
// // );

// export const DataSlice = createSlice({
//   name: "data",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.isSuccess = true;
//         state.isLoading = false;
//         state.users = action.payload;
//         action.payload.forEach((user: User) => {
//           const temp: MappedUsers = {
//             _id: user,
//           };
//           state.mappedUsers.push(temp);
//         });
//         // action.payload.forEach((user: User) => {
//         //   state.tempUsers.set(user._id, user.name);
//         // });
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errMsg = action.payload as string;
//       })
//       .addCase(fetchGroups.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchGroups.fulfilled, (state, action) => {
//         state.isSuccess = true;
//         state.isLoading = false;
//         state.groups = action.payload;
//       })
//       .addCase(fetchGroups.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errMsg = action.payload as string;
//       });
//     // .addCase(fecthUser.pending, (state) => {
//     //   state.isLoading = true;
//     // })
//     // .addCase(fecthUser.fulfilled, (state, action) => {
//     //   state.isSuccess = true;
//     //   state.isLoading = false;
//     //   state.anotherUser = action.payload;
//     // })
//     // .addCase(fecthUser.rejected, (state, action) => {
//     //   state.isError = true;
//     //   state.isLoading = false;
//     //   state.errMsg = action.payload as string;
//     // });
//   },
// });

// export const DataState = (state: RootState) => state.data;
// export const DataReducer = DataSlice.reducer;
