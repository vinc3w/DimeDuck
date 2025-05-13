import { addFlashMessage } from "@features/flash-messages/redux/slice";

const settingsMiddleware = store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case "users/editUsername/fulfilled":
    case "users/editPfp/fulfilled":
    case "settings/editCurrency/fulfilled":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "success",
        })
      );
      break;
    case "users/editUsername/rejected":
    case "users/editPfp/rejected":
    case "settings/editCurrency/rejected":
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

export default settingsMiddleware;
