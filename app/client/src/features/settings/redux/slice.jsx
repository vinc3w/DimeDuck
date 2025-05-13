import { createSlice } from "@reduxjs/toolkit";
import { editCurrency } from "../api/edit-currency";

const initialState = {
  currency: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action) {
      state.currency = action.payload.currency;
    }
  },
  extraReducers: builder => {
    builder.addCase(editCurrency.fulfilled, (state, action) => {
      state.currency = action.payload.currency;
    })
  }
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
