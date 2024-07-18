import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  contactId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.contactId = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contactId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
