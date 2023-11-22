import {
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) {
      delete result.ok;
      dispatch(logout(result));
    } else {
      delete result.ok;
      dispatch(login(result));
    }
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const response = await registerUserWithEmailAndPassword({
      email,
      password,
      displayName,
    });
    console.log(response);
  };
};