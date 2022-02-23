import { createSlice } from "@reduxjs/toolkit";

const cartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addToCart(state, action) {
      if (action.payload.age && action.payload.container) {
        action.payload.name =
          action.payload.name +
          " " +
          action.payload.age +
          " " +
          action.payload.container;
      }

      if (action.payload.age && !action.payload.container) {
        action.payload.name = action.payload.name + " " + action.payload.age;
      }

      const cartItem = action.payload;

      const existingItem = state.cart.find(
        (product) => product._id === cartItem._id
      );
      if (existingItem) {
        existingItem.qty = cartItem.qty;
        if (action.payload.giftCardUids) {
          existingItem.giftCardUids = action.payload.giftCardUids;
        }
      } else {
        state.cart.push(cartItem);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload._id;
      const index = state.cart.findIndex((obj) => obj._id === id);
      state.cart.splice(index, 1);
    },
    updateQty(state, action) {
      const existingProduct = state.cart.find(
        (product) => product.name === action.payload.item
      );
      if (!existingProduct) {
        return;
      } else {
        existingProduct.qty = action.payload.qty;
        if (action.payload.giftCardUids) {
          existingProduct.giftCardUids = action.payload.giftCardUids;
        }
      }
    },

    emptyCart(state, action) {
      state.cart = [];
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
