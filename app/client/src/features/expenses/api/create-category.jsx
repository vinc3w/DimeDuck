import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/expenses`;

export const createCategory = createAsyncThunk(
  "expenses/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/category`, data, {
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
