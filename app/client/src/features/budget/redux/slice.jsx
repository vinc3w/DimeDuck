import { createSlice } from "@reduxjs/toolkit";
import { getBudget } from "../api/get-budget";
import { getAvailable } from "../api/get-available";
import { setBudget } from "../api/set-budget";
import { editBudget } from "../api/edit-budget";

const initialState = {
  budget: {
    isLoading: true,
    data: null,
    error: null,
  },
  available: {
    isLoading: true,
    data: null,
    error: null,
  },
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  extraReducers: builder => {
    builder
    .addCase(getBudget.pending, (state, action) => {
      state.budget.isLoading = true;
    })
    .addCase(getBudget.fulfilled, (state, action) => {
      state.budget.isLoading = false;
      state.budget.data = action.payload.data;
      state.budget.error = null;
    })
    .addCase(getBudget.rejected, (state, action) => {
      state.budget.isLoading = false;
      state.budget.error = action.payload.message;
    })
    
    .addCase(getAvailable.pending, (state, action) => {
      state.available.isLoading = true;
    })
    .addCase(getAvailable.fulfilled, (state, action) => {
      state.available.isLoading = false;
      state.available.data = action.payload.data;
      state.available.error = null;
    })
    .addCase(getAvailable.rejected, (state, action) => {
      state.available.isLoading = false;
      state.available.error = action.payload.message;
    })
    
    .addCase(setBudget.pending, (state, action) => {
      state.budget.isLoading = true;
    })
    .addCase(setBudget.fulfilled, (state, action) => {
      state.budget.isLoading = false;
      state.budget.data = action.payload.data;
      state.budget.error = null;
    })
    .addCase(setBudget.rejected, (state, action) => {
      state.budget.isLoading = false;
      state.budget.error = action.payload.message;
    })
    
    .addCase(editBudget.pending, (state, action) => {
      state.budget.isLoading = true;
    })
    .addCase(editBudget.fulfilled, (state, action) => {
      state.budget.isLoading = false;
      state.budget.data = action.payload.data;
      state.budget.error = null;
    })
    .addCase(editBudget.rejected, (state, action) => {
      state.budget.isLoading = false;
      state.budget.error = action.payload.message;
    });
  }
});

export default budgetSlice.reducer;
