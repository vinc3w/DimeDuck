import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/auth`;

export const resetUserPassword = createAsyncThunk(
  "users/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/reset-password`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
