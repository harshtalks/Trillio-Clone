import { configureStore } from "@reduxjs/toolkit";
import addNewBoardReducer from "./addNewBoardReducer";
import boardScreenReducer from "./boardScreenReducer";
import UIReducer from "./UIReducer";
import userReducers from "./userReducers";

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    addNewBoard: addNewBoardReducer,
    boardSceen: boardScreenReducer,
    users: userReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
