import { Comment, User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Fetcher from "../lib/fetcher";

type initialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  data: Array<Comment & { user: User }>;
};

const commentReducer = createSlice({
  name: "comments",
  initialState: {} as initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched items to the array
        state.data = action.payload;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loadComments = createAsyncThunk(
  "cardScreen/loadComments",
  async (cardId: string) => {
    const result = await Fetcher("/loadComments", { cardId: cardId });
    return result;
  }
);

export default commentReducer.reducer;
