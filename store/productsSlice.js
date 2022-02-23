import { createSlice } from "@reduxjs/toolkit";

const productState = {
  categories: [],
  totalProducts: [],
  products: [],
  product: {},
  addOns: [],
  editProduct: {},
  bestSellerProduct: {},
  featuredProduct: {},
  oneTimeOffer: {},
  babyJuiceArr: [],
  babySmoothieArr: [],
  babyFoodArr: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setBestSellerProduct(state, action) {
      state.bestSellerProduct = action.payload;
    },
    setFeaturedProduct(state, action) {
      state.featuredProduct = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setTotalProducts(state, action) {
      state.totalProducts = action.payload;
    },
    setEditProduct(state, action) {
      state.editProduct = action.payload;
    },
    clearSetEditProduct(state, action) {
      state.editProduct = {};
    },
    updateTotalProducts(state, action) {
      state.totalProducts = action.payload;
    },
    setAddOns(state, action) {
      state.addOns = action.payload;
    },
    setOneTimeOffer(state, action) {
      state.oneTimeOffer = action.payload;
    },
    addBabyJuiceArr(state, action) {
      const juice = action.payload;
      const existingJuice = state.babyJuiceArr.find(
        (item) => item._id === juice._id
      );
      if (existingJuice) {
        const index = state.babyJuiceArr.findIndex(
          (obj) => obj._id === juice._id
        );
        state.babyJuiceArr.splice(index, 1);
      } else {
        if (state.babyJuiceArr.length < 2) {
          state.babyJuiceArr.push(juice);
        }
      }
    },
    addBabySmoothieArr(state, action) {
      const smoothie = action.payload;
      const existingSmoothie = state.babySmoothieArr.find(
        (item) => item._id === smoothie._id
      );
      if (existingSmoothie) {
        const index = state.babySmoothieArr.findIndex(
          (obj) => obj._id === smoothie._id
        );
        state.babySmoothieArr.splice(index, 1);
      } else {
        if (state.babySmoothieArr.length < 2) {
          state.babySmoothieArr.push(smoothie);
        }
      }
    },
    addBabyFoodArr(state, action) {
      const food = action.payload;
      const existingFood = state.babyFoodArr.find(
        (item) => item._id === food._id
      );
      if (existingFood) {
        const index = state.babyFoodArr.findIndex(
          (obj) => obj._id === food._id
        );
        state.babyFoodArr.splice(index, 1);
      } else {
        if (state.babyFoodArr.length < 2) {
          state.babyFoodArr.push(food);
        }
      }
    },
    emptyBabyArrs(state) {
      state.babyJuiceArr = [];
      state.babySmoothieArr = [];
      state.babyFoodArr = [];
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
