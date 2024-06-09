import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";

const apiUrl = process.env.BASE_URL;

const initialState = {
  product: {
    status: "idle",
    error: null,
    data: {},
  },
};


export const createProduct = createAsyncThunk(
  "profile/newProduct",
  async ({ data, userId }) => {
    try {
      const response = await axios.post(
        `https://backend-verxio.vercel.app/api/v1/product/${userId}`,

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
        state.product.status = "loading";
        state.product.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (
          // action.payload === "Success" ||
          action.payload.success === true
        ) {
          state.product.data = action.payload;
          state.product.status = "succeeded";
        } else {
          state.product.status = "failed";
          state.product.error = action.payload;
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.product.error = action.payload;
        state.product.status = "failed";
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
