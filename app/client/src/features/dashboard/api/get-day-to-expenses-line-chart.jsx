import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/dashboard`;

export const getDayToExpensesLineChart = createAsyncThunk(
  "dashboard/getDayToExpensesLineChart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/day-to-expenses-line-chart?${new URLSearchParams(data).toString()}`, {
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
