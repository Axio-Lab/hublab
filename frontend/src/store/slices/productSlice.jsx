import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";

const apiUrl = process.env.BASE_URL;

const initialState = {
  Product: {
    status: "idle",
    error: null,
    data: {},
  },
  // userProduct: {
  //   status: "idle",
  //   error: null,
  //   data: {},
  // },
  // singleProduct: {
  //   status: "idle",
  //   error: null,
  //   data: {},
  // },
};

export const createProduct = createAsyncThunk(
  "profile/newCampaign",
  async ({ data, id }) => {
    try {
      const response = await axios.post(
        `https://backend-verxio.vercel.app/api/v1/product`,

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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.campaign.status = "loading";
        state.campaign.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
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
      .addCase(createProduct.rejected, (state, action) => {
        state.campaign.error = action.payload;
        state.campaign.status = "failed";
      })

      //purge all state
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const productActions = productSlice.actions;
export const {} = productSlice.actions;
export default productSlice.reducer;
