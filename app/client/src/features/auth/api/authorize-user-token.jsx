import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/auth`;

export const authorizeUserToken = createAsyncThunk(
  "users/authorizeToken",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/authorize-token`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);    
    }
  },
);
