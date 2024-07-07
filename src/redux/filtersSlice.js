import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { searchFilter } = filtersSlice.actions;

export const selectNameFilter = (state) => state.filters.name;

export const filterReducer = filtersSlice.reducer;
