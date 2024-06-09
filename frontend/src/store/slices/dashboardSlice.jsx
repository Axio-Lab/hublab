import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";
// const apiUrl = process.env.BASE_URL;


const initialState = {
  dashboardInfo: {
    status: "idle",
    error: null,
    data: {},
  },
};

export const getUserDashboardInfo = createAsyncThunk(
  "profile/userDashboardInfo",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://backend-verxio.vercel.app/api/v1/dashboard/${userId}`
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDashboardInfo.pending, (state) => {
        state.dashboardInfo.status = "loading";
        state.dashboardInfo.error = null;
      })
      .addCase(getUserDashboardInfo.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.dashboardInfo.data = action.payload;
          state.dashboardInfo.status = "succeeded";
        } else {
          state.dashboardInfo.status = "failed";
          state.dashboardInfo.error = action.payload;
        }
      })
      .addCase(getUserDashboardInfo.rejected, (state, action) => {
        state.dashboardInfo.error = action.payload;
        state.dashboardInfo.status = "failed";
      })

      //purge all state
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const dashboardActions = dashboardSlice.actions;
export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
