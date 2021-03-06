import { configureStore } from "@reduxjs/toolkit";
import addNewBoardReducer from "./addNewBoardReducer";
import addNewCard from "./addNewCard";
import cardScreenReducer from "./cardScreenReducer";
import boardScreenReducer from "./boardScreenReducer";
import UIReducer from "./UIReducer";
import userReducers from "./userReducers";
import commentsReducer from "./commentsReducer";

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    addNewBoard: addNewBoardReducer,
    boardSceen: boardScreenReducer,
    users: userReducers,
    addCard: addNewCard,
    cardScreen: cardScreenReducer,
    comments: commentsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
