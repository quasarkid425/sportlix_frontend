import { configureStore } from "@reduxjs/toolkit";
import storage from "../utils/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import cartReducer from "./cartSlice";
import shippingReducer from "./shippingSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import productReducer from "./productsSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const reducers = combineReducers({
  cart: cartReducer,
  shipping: shippingReducer,
  user: userReducer,
  orders: orderReducer,
  products: productReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
