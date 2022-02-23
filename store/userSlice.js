import { createSlice } from "@reduxjs/toolkit";

const userState = {
  isLoggedIn: false,
  user: {},
  totalUsers: [],
  usersOrder: [],
};

const userSlice = createSlice({
  name: "users",
  initialState: userState,
  reducers: {
    userDetails(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userProfileUpdate(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
    totalUsers(state, action) {
      state.totalUsers = action.payload;
    },
    usersOrders(state, action) {
      state.usersOrder = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
