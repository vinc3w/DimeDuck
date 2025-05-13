import { addFlashMessage } from "@features/flash-messages/redux/slice";

const budgetMiddleware = store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case "budget/set/fulfilled":
    case "budget/edit/fulfilled":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "success",
        })
      );
      break;
    case "budget/get/rejected":
    case "budget/getAvailable/rejected":
      if (action.payload.message !== "Budget not found!") {
        dispatch(
          addFlashMessage({
            message: action.payload.message,
            severity: "error",
          })
        );
      }
      break;

    case "budget/set/rejected":
    case "budget/edit/rejected":
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

export default budgetMiddleware;
