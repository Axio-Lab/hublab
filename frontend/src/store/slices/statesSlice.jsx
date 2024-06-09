import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  start: {},
  details: {},
  summary: {},
  userProfile: {},
  userId: "",
  edit: false,
  totalCampaignPoint: {},
  choosePoint: 0,
  actionModal: false,
  selectedProductImage: {},
  userCollectionNFTOBJ: {}
};

const statesSlice = createSlice({
  name: "generalState",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setCloseActionModal: (state, action) => {
      state.actionModal = action.payload;
    },
    setStart: (state, action) => {
      // state.start = action.payload;
      state.start = { ...state.start, ...action.payload };
      // console.log(state, action.payload, "bhbkk");
    },
    setDetails: (state, action) => {
      state.details = action.payload;
      // state.details = { ...state.details, ...action.payload };
    },
    setTotalCampaignPoint: (state, action) => {
      state.totalCampaignPoint = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setChoosePoint: (state, action) => {
      state.choosePoint = action.payload;
    },
    setSelectedProductImage: (state, action) => {
      state.selectedProductImage = action.payload;
    },
    setUserCollectionNFTOBJ: (state, action) => {
      state.userCollectionNFTOBJ = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const statesActions = statesSlice.actions;
export const {
  setUserId,
  setUserProfile,
  setEdit,
  setStart,
  setDetails,
  setTotalCampaignPoint,
  setSummary,
  setChoosePoint,
  setCloseActionModal,
  setSelectedProductImage,
  setUserCollectionNFTOBJ
} = statesSlice.actions;
export default statesSlice.reducer;
