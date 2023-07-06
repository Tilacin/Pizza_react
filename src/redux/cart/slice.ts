import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceStatate } from "./types";


const initialState: CartSliceStatate = getCartFromLS()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id); //если объект уже добавили

      if (findItem) {
        //то просто увеличиваем счётчик, а не добавляем опять (на главной в овале )
        findItem.count++;
      } else {
        //иначе добавляем товар и счётчик 1
        state.items.push({
          ...action.payload,
          count: 1,
          
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;