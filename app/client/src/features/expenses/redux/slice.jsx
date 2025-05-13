import { createSlice } from "@reduxjs/toolkit";
import { getExpenses } from "@features/expenses/api/get-expenses";
import { getCategories } from "../api/get-categories";
import { createCategory } from "../api/create-category";
import { getSpentToday } from "../api/get-spent-today";
import { getTodayExpenses } from "../api/get-today-expenses";

const initialState = {
  filters: {
    expenses: {
      name: "",
      minAmount: "",
      maxAmount: "",
      dateStart: null,
      dateEnd: null,
      categories: [],
      page: 0,
      rowsPerPage: 25,
      sortBy: "date",
      order: "desc"
    },
    categories: {
      name: "",
      page: 0,
      rowsPerPage: 25,
      sortBy: "date",
      order: "desc"
    }
  },
  expenses: {
    total: 0,
    isLoading: true,
    error: null,
    data: [],
  },
  categories: {
    total: 0,
    isLoading: true,
    error: null,
    data: [],
  },
  spentToday: {
    isLoading: true,
    error: null,
    data: [],
  },
  todayExpenses: {
    isLoading: true,
    error: null,
    data: [],
  },
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpensesFilters: (state, action) => {
      state.filters.expenses = {
        ...state.filters.expenses,
        ...action.payload
      };
    },
    clearExpensesFilters: (state, action) => {
      state.filters.expenses = initialState.filters.expenses;
    },
    setCategoriesFilters: (state, action) => {
      state.filters.categories = {
        ...state.filters.categories,
        ...action.payload
      };
    },
    clearCategoriesFilters: (state, action) => {
      state.filters.categories = initialState.filters.categories;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(getExpenses.pending, (state, action) => {
      state.expenses.isLoading = true;
    })
    .addCase(getExpenses.fulfilled, (state, action) => {
      state.expenses.isLoading = false;
      state.expenses.total = action.payload.total;
      state.expenses.data = action.payload.data;
      state.expenses.error = null;
    })
    .addCase(getExpenses.rejected, (state, action) => {
      state.expenses.isLoading = false;
      state.expenses.error = action.payload.message;
    })

    .addCase(getCategories.pending, (state, action) => {
      state.categories.isLoading = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.categories.isLoading = false;
      state.categories.total = action.payload.total;
      state.categories.data = action.payload.data;
      state.categories.error = null;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.categories.isLoading = false;
      state.categories.error = action.payload.message;
    })
    
    .addCase(createCategory.fulfilled, (state, action) => {
      state.categories.data.push(action.payload.category);
    })

    .addCase(getSpentToday.pending, (state, action) => {
      state.spentToday.isLoading = true;
    })
    .addCase(getSpentToday.fulfilled, (state, action) => {
      state.spentToday.isLoading = false;
      state.spentToday.data = action.payload.data;
      state.spentToday.error = null;
    })
    .addCase(getSpentToday.rejected, (state, action) => {
      state.spentToday.isLoading = false;
      state.spentToday.error = action.payload.message;
    })

    .addCase(getTodayExpenses.pending, (state, action) => {
      state.todayExpenses.isLoading = true;
    })
    .addCase(getTodayExpenses.fulfilled, (state, action) => {
      state.todayExpenses.isLoading = false;
      state.todayExpenses.data = action.payload.data;
      state.todayExpenses.error = null;
    })
    .addCase(getTodayExpenses.rejected, (state, action) => {
      state.todayExpenses.isLoading = false;
      state.todayExpenses.error = action.payload.message;
    });
  }
});

export const {
  setExpensesFilters,
  clearExpensesFilters,
  setCategoriesFilters,
  clearCategoriesFilters,
} = expensesSlice.actions;
export default expensesSlice.reducer;
