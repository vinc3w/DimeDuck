import { createSlice } from "@reduxjs/toolkit";
import { getNoOfExpenses } from "../api/get-no-of-expenses";
import { getAvailable } from "../api/get-available";
import { getTotalExpensesPieChart } from "../api/get-total-expenses-pie-chart";
import { getTotalExpenses } from "../api/get-total-expenses";
import { getTopExpenses } from "../api/get-top-expenses";
import { getDayToExpensesLineChart } from "../api/get-day-to-expenses-line-chart";
import moment from "moment";

const initialState = {
  filters: {
    dateStart: moment().add(-1, "M").format("YYYY-MM-DD"),
    dateEnd: moment().format("YYYY-MM-DD"),
  },
  available: {
    isLoading: true,
    data: null,
    error: null,
  },
  noOfExpenses: {
    isLoading: true,
    data: null,
    error: null,
  },
  totalExpenses: {
    isLoading: true,
    data: null,
    error: null,
  },
  totalExpensesPieChart: {
    isLoading: true,
    data: [],
    error: null,
  },
  topExpenses: {
    isLoading: true,
    data: [],
    error: null,
  },
  dayToExpensesLineChart: {
    isLoading: true,
    data: [],
    error: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
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
    
    .addCase(getNoOfExpenses.pending, (state, action) => {
      state.noOfExpenses.isLoading = true;
    })
    .addCase(getNoOfExpenses.fulfilled, (state, action) => {
      state.noOfExpenses.isLoading = false;
      state.noOfExpenses.data = action.payload.total;
      state.noOfExpenses.error = null;
    })
    .addCase(getNoOfExpenses.rejected, (state, action) => {
      state.noOfExpenses.isLoading = false;
      state.noOfExpenses.error = action.payload.message;
    })
    
    .addCase(getTotalExpenses.pending, (state, action) => {
      state.totalExpenses.isLoading = true;
    })
    .addCase(getTotalExpenses.fulfilled, (state, action) => {
      state.totalExpenses.isLoading = false;
      state.totalExpenses.data = action.payload.data;
      state.totalExpenses.error = null;
    })
    .addCase(getTotalExpenses.rejected, (state, action) => {
      state.totalExpenses.isLoading = false;
      state.totalExpenses.error = action.payload.message;
    })
    
    .addCase(getTotalExpensesPieChart.pending, (state, action) => {
      state.totalExpensesPieChart.isLoading = true;
    })
    .addCase(getTotalExpensesPieChart.fulfilled, (state, action) => {
      state.totalExpensesPieChart.isLoading = false;
      state.totalExpensesPieChart.data = action.payload.data;
      state.totalExpensesPieChart.error = null;
    })
    .addCase(getTotalExpensesPieChart.rejected, (state, action) => {
      state.totalExpensesPieChart.isLoading = false;
      state.totalExpensesPieChart.error = action.payload.message;
    })
    
    .addCase(getTopExpenses.pending, (state, action) => {
      state.topExpenses.isLoading = true;
    })
    .addCase(getTopExpenses.fulfilled, (state, action) => {
      state.topExpenses.isLoading = false;
      state.topExpenses.data = action.payload.data;
      state.topExpenses.error = null;
    })
    .addCase(getTopExpenses.rejected, (state, action) => {
      state.topExpenses.isLoading = false;
      state.topExpenses.error = action.payload.message;
    })
    
    .addCase(getDayToExpensesLineChart.pending, (state, action) => {
      state.dayToExpensesLineChart.isLoading = true;
    })
    .addCase(getDayToExpensesLineChart.fulfilled, (state, action) => {
      state.dayToExpensesLineChart.isLoading = false;
      state.dayToExpensesLineChart.data = action.payload.data;
      state.dayToExpensesLineChart.error = null;
    })
    .addCase(getDayToExpensesLineChart.rejected, (state, action) => {
      state.dayToExpensesLineChart.isLoading = false;
      state.dayToExpensesLineChart.error = action.payload.message;
    });
  }
});

export const { setDashboardFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
