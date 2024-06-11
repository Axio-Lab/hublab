import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";
// const apiUrl = process.env.BASE_URL;


const initialState = {
  userCollection: {
    status: "idle",
    error: null,
    data: {},
  },
};

export const getUserCollection = createAsyncThunk(
  "profile/userCollection",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://backend-verxio.vercel.app/api/v1/collection/nft/${userId}`
      );
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      if (!err.response) {
        throw err.message;
      }
      return err.response.data;
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCollection.pending, (state) => {
        state.userCollection.status = "loading";
        state.userCollection.error = null;
      })
      .addCase(getUserCollection.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.userCollection.data = action.payload;
          state.userCollection.status = "succeeded";
        } else {
          state.userCollection.status = "failed";
          state.userCollection.error = action.payload;
        }
      })
      .addCase(getUserCollection.rejected, (state, action) => {
        state.userCollection.error = action.payload;
        state.userCollection.status = "failed";
      })

      //purge all state
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const collectionActions = collectionSlice.actions;
export const {} = collectionSlice.actions;
export default collectionSlice.reducer;
