import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = `https://ipinfo.io/json`;

export const getIPInfo = createAsyncThunk(
  "app/getIPInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);    
    }
  },
);
