import { createSlice } from "@reduxjs/toolkit";

const shippingState = {
  shippingDetails: {},
};

const shippingSlice = createSlice({
  name: "shippping",
  initialState: shippingState,
  reducers: {
    addShipping(state, action) {
      state.shippingDetails = action.payload;
    },
    clearShipping(state) {
      state.shippingDetails = {};
    },
  },
});

export const shippingActions = shippingSlice.actions;

export default shippingSlice.reducer;
