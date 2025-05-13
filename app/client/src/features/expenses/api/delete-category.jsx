import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/expenses`;

export const deleteCategory = createAsyncThunk(
  "expenses/deleteCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/category/${data.categoryId}`, {
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
