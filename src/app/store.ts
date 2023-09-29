import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/Auth/AuthSlice";
import { MessageReducer } from "../features/Message/MessageSlice";
import { ModalReducer } from "../features/Modal/ModalSlice";
import { enableMapSet } from "immer";
import groupReducer from "../features/Group/GroupSlice";

enableMapSet();

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     msg: MessageReducer,
//     data: DataReducer,
//     modal: ModalReducer,
//   },
// });
export function configureLocalStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    msg: MessageReducer,
    modal: ModalReducer,
    group: groupReducer,
  });

  return configureStore({
    reducer: rootReducer,
  });
}

export const store = configureLocalStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
