import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/Auth/AuthSlice";
import { MessageReducer } from "../features/Message/MessageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    msg: MessageReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
