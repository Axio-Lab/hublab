import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";

const apiUrl = process.env.BASE_URL;

const initialState = {
  campaign: {
    status: "idle",
    error: null,
    data: {},
  },
  userCampaign: {
    status: "idle",
    error: null,
    data: {},
  },
  singleCampaign: {
    status: "idle",
    error: null,
    data: {},
  },
};

export const createCampaign = createAsyncThunk(
  "profile/newCampaign",
  async ({ data, id }) => {
    try {
      const response = await axios.post(
        `https://backend-verxio.vercel.app/api/v1/campaigns`, 
        data
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


export const getUserCampaigns = createAsyncThunk(
  "profile/userCampaigns",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://backend-verxio.vercel.app/api/v1/campaigns/profile/${id}` // Assuming apiUrl is defined somewhere in your code
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

export const getCampaign = createAsyncThunk(
  "profile/singleCampaign",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `https://backend-verxio.vercel.app/api/v1/campaigns/${id}` // Assuming apiUrl is defined somewhere in your code
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


const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create campaign
      .addCase(createCampaign.pending, (state) => {
        state.campaign.status = "loading";
        state.campaign.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.campaign.data = action.payload;
          state.campaign.status = "succeeded";
        } else {
          state.campaign.status = "failed";
          state.campaign.error = action.payload;
        }
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.campaign.error = action.payload;
        state.campaign.status = "failed";
      })

      //get user campaigns
      .addCase(getUserCampaigns.pending, (state) => {
        state.userCampaign.status = "loading";
        state.userCampaign.error = null;
      })
      .addCase(getUserCampaigns.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.userCampaign.data = action.payload;
          state.userCampaign.status = "succeeded";
        } else {
          state.userCampaign.status = "failed";
          state.userCampaign.error = action.payload;
        }
      })
      .addCase(getUserCampaigns.rejected, (state, action) => {
        state.userCampaign.error = action.payload;
        state.userCampaign.status = "failed";
      })

      //get single campaigns
      .addCase(getCampaign.pending, (state) => {
        state.singleCampaign.status = "loading";
        state.singleCampaign.error = null;
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.singleCampaign.data = action.payload;
          state.singleCampaign.status = "succeeded";
        } else {
          state.singleCampaign.status = "failed";
          state.singleCampaign.error = action.payload;
        }
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.singleCampaign.error = action.payload;
        state.singleCampaign.status = "failed";
      })

      //purge all state
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const campaignActions = campaignSlice.actions;
export const {} = campaignSlice.actions;
export default campaignSlice.reducer;