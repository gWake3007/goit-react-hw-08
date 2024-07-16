import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  changeContact,
} from "./operations";
import { loginOutOperation } from "../auth/operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedContact: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(changeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.map((contact) =>
          contact.id === payload.id ? payload : contact
        );
        state.selectedContact = null;
      })
      .addCase(changeContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // Зберігаємо лише серіалізоване повідомлення про помилку
      })
      .addCase(loginOutOperation.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setSelectedContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
