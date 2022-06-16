import { Board, User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  image: "",
  publiclyVisible: true,
  description: "",
} as Board;

const addNewBoardSlice = createSlice({
  name: "addNewBoard",
  initialState: initialState,
  reducers: {
    addName(state, action: { payload: string }) {
      state.name = action.payload;
    },
    addImage(state, action: { payload: string }) {
      state.image = action.payload;
    },
    toggleVisibility(state, action: { payload: boolean }) {
      state.publiclyVisible = action.payload;
    },
    addDescription(state, action: { payload: string }) {
      state.description = action.payload;
    },
    clearFields(state) {
      state.name = "";
      state.description = "";
      state.image = "";
      state.publiclyVisible = true;
    },
  },
});

export const {
  addName,
  addImage,
  toggleVisibility,
  addDescription,
  clearFields,
} = addNewBoardSlice.actions;

export default addNewBoardSlice.reducer;
