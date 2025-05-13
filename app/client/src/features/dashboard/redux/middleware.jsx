import { addFlashMessage } from "@features/flash-messages/redux/slice";

const dashboardMiddleware = store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case "dashboard/getAvailable/rejected":
    case "dashboard/getNoOfExpenses/rejected":
    case "dashboard/getTotalExpenses/rejected":
    case "dashboard/getTotalExpensesPieChart/rejected":
    case "dashboard/getTopExpenses/rejected":
    case "dashboard/getDayToExpensesLineChart/rejected":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "error",
        })
      );
      break;
  }
  return next(action);
}

export default dashboardMiddleware;
