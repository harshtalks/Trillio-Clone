import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Fetcher from "../lib/fetcher";

type intialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  users: Array<User>;
};

const userSlice = createSlice({
  name: "users",
  initialState: {} as intialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched items to the array
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  const res = await Fetcher("/getMembers");
  return res;
});

export default userSlice.reducer;
