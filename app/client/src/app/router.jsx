import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "@components/layouts/auth-layout";
import AppLayout from "@components/layouts/app-layout";
import Error404 from "@components/ui/404";
import LoginRoute from "@app/routes/auth/login";
import RegisterRoute from "@app/routes/auth/register";
import ForgotPasswordRoute from "./routes/auth/forgot-password";
import ResetPasswordRoute from "./routes/auth/reset-password";
import RedirectToDashboard from "@app/routes/app/redirect-to-dashboard";
import DashboardRoute from "@app/routes/app/dashboard";
import BudgetRoute from "@app/routes/app/budget";
import ExpensesRoute from "@app/routes/app/expenses";
import SettingsRoute from "@app/routes/app/settings";
import {
  BUDGET,
  DASHBOARD,
  EXPENSES,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  SETTINGS,
} from "./config/routes";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: LOGIN,
        element: <LoginRoute />,
      },
      {
        path: REGISTER,
        element: <RegisterRoute />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgotPasswordRoute />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPasswordRoute />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RedirectToDashboard />,
      },
      {
        path: DASHBOARD,
        element: <DashboardRoute />,
      },
      {
        path: BUDGET,
        element: <BudgetRoute />,
      },
      {
        path: EXPENSES,
        element: <ExpensesRoute />,
      },
      {
        path: SETTINGS,
        element: <SettingsRoute />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
