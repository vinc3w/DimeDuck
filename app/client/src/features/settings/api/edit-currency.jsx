import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/settings`;

export const editCurrency = createAsyncThunk(
  "settings/editCurrency",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/currency`, data, {
        headers: {
          Authorization: `Basic ${data.userId}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);    
    }
  },
);
