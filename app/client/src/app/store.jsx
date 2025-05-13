import { configureStore } from "@reduxjs/toolkit";
import flashMessageSlice from "@features/flash-messages/redux/slice";
import authSlice from "@features/auth/redux/slice";
import budgetSlice from "@features/budget/redux/slice";
import expensesSlice from "@features/expenses/redux/slice";
import settingsSlice from "@features/settings/redux/slice";
import dashboardSlice from "@features/dashboard/redux/slice";
import authMiddleware from "@features/auth/redux/middleware";
import settingsMiddleware from "@features/settings/redux/middleware";
import expensesMiddleware from "@features/expenses/redux/middleware";
import budgetMiddleware from "@features/budget/redux/middleware";
import dashboardMiddleware from "@features/dashboard/redux/middleware";

export const store = configureStore({
  reducer: {
    flashMessages: flashMessageSlice,
    auth: authSlice,
    budget: budgetSlice,
    expenses: expensesSlice,
    settings: settingsSlice,
    dashboard: dashboardSlice,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(authMiddleware)
      .concat(settingsMiddleware)
      .concat(expensesMiddleware)
      .concat(budgetMiddleware)
      .concat(dashboardMiddleware);
  }
});
