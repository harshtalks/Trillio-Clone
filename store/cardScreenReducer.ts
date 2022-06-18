import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Fetcher from "../lib/fetcher";
import { CardProps } from "../types/types";

type initialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  data: CardProps;
};

const cardScreenSlice = createSlice({
  initialState: {} as initialState,
  reducers: {},
  name: "cardScreen",
  extraReducers(builder) {
    builder
      .addCase(loadCardData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadCardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched items to the array
        state.data = action.payload;
      })
      .addCase(loadCardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Comments
  },
});

export const loadCardData = createAsyncThunk(
  "cardScreen/loadCardData",
  async (id: string) => {
    const result = await Fetcher("/getCardData", { cardId: id });
    return result;
  }
);

export default cardScreenSlice.reducer;
