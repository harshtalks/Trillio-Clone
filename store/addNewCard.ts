import { Card } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
} as Card;

const cardSlice = createSlice({
  name: "addCard",
  initialState: initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
  },
});

export const { setName, setDescription, setImage } = cardSlice.actions;

export default cardSlice.reducer;
