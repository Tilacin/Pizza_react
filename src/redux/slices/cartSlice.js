import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
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
      state.totalPrice = state.items.reduce((sum, obj) => {
        //вычисляем сумму товара
        return obj.price * obj.count + sum; //цену пиццы умножаем на кол-во
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
