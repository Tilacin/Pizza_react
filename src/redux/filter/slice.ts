import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: "популярности",
      sortProperty: SortPropertyEnum.RATING_DESC,
    },
  };
  
  const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload;
      },
      setSort(state, action: PayloadAction<Sort>) {
        state.sort = action.payload;
      },
      setCurentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
        if (Object.keys(action.payload).length) {
          state.currentPage = Number(action.payload.currentPage);
          state.categoryId = Number(action.payload.categoryId);
          state.sort = action.payload.sort;
        } else {
          state.currentPage = 1
          state.categoryId = 0
          state.sort = {
            name: 'популярности',
            sortProperty: SortPropertyEnum.RATING_DESC
          }
        }
      },
    },
  });

  export const { setCategoryId, setSort, setCurentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

  