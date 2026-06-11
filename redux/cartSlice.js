import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    discountRate: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.discountRate = 0;
    },
    setDiscount: (state, action) => {
      state.discountRate = action.payload;
    },
  },
});

export const { addProduct, reset, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;