import axios from "axios";
import { toast } from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setHeaderToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearHeaderToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const registrationOperation = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("users/signup", userData);
      setHeaderToken(data.token);
      toast.success("Registration was successful! Welcome!");
      return data;
    } catch (error) {
      toast.error("Failed to register! Try again.");
      return rejectWithValue(error.message);
    }
  }
);

export const loginOperation = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("users/login", userData);
      setHeaderToken(data.token);
      toast.success("Login was successful! Welcome!");
      return data;
    } catch (error) {
      toast.error("Failed to login! Try again.");
      return rejectWithValue(error.message);
    }
  }
);

export const loginOutOperation = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("users/logout");
      clearHeaderToken();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUserOperation = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      setHeaderToken(auth.token);
      const { data } = await axios.get("users/current");
      setHeaderToken(data.token);
      return data;
    } catch (error) {
      clearHeaderToken();
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);
