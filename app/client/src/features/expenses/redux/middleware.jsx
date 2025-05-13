import { addFlashMessage } from "@features/flash-messages/redux/slice";

const expensesMiddleware = store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case "expenses/create/fulfilled":
    case "expenses/edit/fulfilled":
    case "expenses/delete/fulfilled":
    case "expenses/createCategory/fulfilled":
    case "expenses/editCategory/fulfilled":
    case "expenses/deleteCategory/fulfilled":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "success",
        })
      );
      break;
    case "expenses/get/rejected":
    case "expenses/create/rejected":
    case "expenses/edit/rejected":
    case "expenses/delete/rejected":
    case "expenses/getCategory/rejected":
    case "expenses/createCategory/rejected":
    case "expenses/editCategory/rejected":
    case "expenses/deleteCategory/rejected":
    case "expenses/getSpentToday/rejected":
    case "expenses/getTodayExpenses/rejected":
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

export default expensesMiddleware;
