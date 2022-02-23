import { createSlice } from "@reduxjs/toolkit";

const orderState = {
  order: {},
  orderAgain: {},
  orders: [],
  adminOrders: [],
  originalItems: 0,
  originalShipping: 0,
  originalStartingPrice: 0,
  originalTax: 0,
  originalTotal: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
    addOrder(state, action) {
      state.order = action.payload;
    },
    addOrders(state, action) {
      state.orders = action.payload;
    },
    removeOrder(state, action) {
      state.order = {};
    },
    setAdminOrders(state, action) {
      state.adminOrders = action.payload;
    },
    orderAgain(state, action) {
      state.orderAgain = action.payload;
    },
    setOrignalPrices(state, action) {
      state.originalItems = action.payload.originalItems;
      state.originalShipping = action.payload.originalShipping;
      state.originalTax = action.payload.orginalTax;
      state.originalStartingPrice =
        action.payload.originalItems +
        action.payload.originalShipping +
        action.payload.orginalTax;
      state.originalTotal =
        action.payload.originalItems +
        action.payload.originalShipping +
        action.payload.orginalTax;
    },
    addAddOn(state, action) {
      const items = state.originalItems + action.payload;
      const newTax = items * 0.0625;
      const total = items + newTax + state.originalShipping;

      state.originalItems = items;
      state.originalTax = newTax;
      state.originalTotal = total;
    },
    removeAddOn(state, action) {
      const items = state.originalItems - action.payload;
      const newTax = items * 0.0625;
      const total = items + newTax + state.originalShipping;

      state.originalItems = items;
      state.originalTax = newTax;
      state.originalTotal = total;
    },
    applyDiscount(state, action) {
      state.originalTotal = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
