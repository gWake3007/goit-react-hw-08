import axios from "axios";
import { toast } from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/contacts", contact);
      toast.success("The contact was successfully added!");
      return data;
    } catch (error) {
      toast.error("Failed to add contact. Please try again!");
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      toast.success("The contact was successfully deleted!");
      return id;
    } catch (error) {
      toast.error("Failed to delete contact. Please try again!");
      return rejectWithValue(error);
    }
  }
);
