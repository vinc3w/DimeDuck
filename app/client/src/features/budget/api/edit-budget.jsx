import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/budget`;

export const editBudget = createAsyncThunk(
  "budget/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_API_URL}`, data, {
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
