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
  },
});

export const { storeBoard, changeVisibilityAction } = boardScreenSlice.actions;

export default boardScreenSlice.reducer;
