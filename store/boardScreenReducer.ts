import { createSlice } from "@reduxjs/toolkit";
import { BoardProps } from "../types/types";

const initialState = {
  id: "",
  name: "",
  description: "",
  image: "",
} as BoardProps;

const boardScreenSlice = createSlice({
  name: "boardSceen",
  initialState: initialState,
  reducers: {
    storeBoard(state, action: { payload: BoardProps }) {
      return (state = action.payload);
    },
    changeVisibilityAction(state, action) {
      state.publiclyVisible = action.payload;
    },
    addMember(state, action) {
      state.members = [...state.members, action.payload];
    },
    addList(state, action) {
      state.lists = [...state.lists, action.payload];
    },
    addCard(state, action) {
      state.lists.map((list) => {
        if (list.id === action.payload.id) {
          list.card = [...list.card, action.payload];
        }
        return list;
      });
    },
    changeDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const {
  storeBoard,
  changeVisibilityAction,
  addMember,
  addList,
  addCard,
  changeDescription,
} = boardScreenSlice.actions;

export default boardScreenSlice.reducer;
