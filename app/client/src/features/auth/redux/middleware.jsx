import { addFlashMessage } from "@features/flash-messages/redux/slice";
import { setAuthUser } from "./slice";
import { setSettings } from "@features/settings/redux/slice";

const authMiddleware = store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case "users/logIn/fulfilled":
    case "users/register/fulfilled":
    case "users/logOut/fulfilled":
    case "users/sendPasswordResetEmail/fulfilled":
    case "users/resetPassword/fulfilled":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "success",
        })
      );
      break;
    case "users/logIn/rejected":
    case "users/register/rejected":
    case "users/logOut/rejected":
    case "users/sendPasswordResetEmail/rejected":
    case "users/resetPassword/rejected":
      dispatch(
        addFlashMessage({
          message: action.payload.message,
          severity: "error",
        })
      );
      break;
      
    case "users/authorizeToken/fulfilled":
      dispatch(setAuthUser(action.payload.user));
      dispatch(setSettings(action.payload.settings));
      break;
  }
  return next(action);
}

export default authMiddleware;
