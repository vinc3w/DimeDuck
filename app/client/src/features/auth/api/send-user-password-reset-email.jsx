import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/auth`;

export const sendUserPasswordResetEmail = createAsyncThunk(
  "users/sendPasswordResetEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/send-password-reset-email`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
