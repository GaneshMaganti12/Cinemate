import {
  changePasswordFailed,
  changePasswordStarted,
  changePasswordSuccess,
  clearChangePasswordData,
  clearLoginData,
  clearNewPasswordData,
  clearRegisterData,
  clearResetPasswordData,
  loginFailed,
  loginStarted,
  loginSuccess,
  logout,
  newPasswordFailed,
  newPasswordStarted,
  newPasswordSuccess,
  registerFailed,
  registerStarted,
  registerSuccess,
  resetPasswordFailed,
  resetPasswordStarted,
  resetPasswordSuccess,
} from "../Reducers/AuthReducer";
import axios from "axios";

const apiUrl = "https://cinemate-od8b.onrender.com";

export const dispatchRegister = (newData) => {
  return async (dispatch) => {
    try {
      dispatch(registerStarted());
      await axios.post(`${apiUrl}/register`, newData).then((res) => {
        if (res.data.success) {
          dispatch(registerSuccess(res.data.message));
        } else {
          dispatch(registerFailed(res.data.message));
        }
      });
    } catch (error) {
      dispatch(registerFailed(error.response.data.message));
    }
  };
};

export const dispatchLogin = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(loginStarted());
      await axios.post(`${apiUrl}/login`, userData).then((res) => {
        if (res.data.success) {
          dispatch(loginSuccess(res.data.jwtToken));
          localStorage.setItem("jwtToken", res.data.jwtToken);
        } else {
          dispatch(loginFailed(res.data.message));
        }
      });
    } catch (error) {
      dispatch(loginFailed(error.response.data.message));
    }
  };
};

export const dispatchLogout = () => {
  return (dispatch) => {
    dispatch(logout());
    localStorage.removeItem("jwtToken");
  };
};

export const dispatchResetPassword = (newData) => {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordStarted());
      const options = {
        headers: {
          "client-host": location.host,
          "client-protocal": location.protocol,
        },
      };
      await axios
        .post(`${apiUrl}/reset-password`, newData, options)
        .then((res) => {
          if (res.data.success) {
            dispatch(resetPasswordSuccess(res.data.message));
          } else {
            dispatch(resetPasswordFailed(res.data.message));
          }
        });
    } catch (error) {
      dispatch(resetPasswordFailed(error.response.data.message));
    }
  };
};

export const dispatchNewPassword = (userId, token, newData) => {
  return async (dispatch) => {
    try {
      dispatch(newPasswordStarted());
      const options = {
        headers: {
          "client-host": location.host,
          "client-protocal": location.protocol,
        },
      };
      await axios
        .post(`${apiUrl}/reset-password/${userId}/${token}`, newData, options)
        .then((res) => {
          if (res.data.success) {
            dispatch(newPasswordSuccess(res.data.message));
          } else {
            dispatch(newPasswordFailed("Please Try Again"));
          }
        });
    } catch (error) {
      dispatch(newPasswordFailed(error.response.data.message));
    }
  };
};

export const dispatchChangePassword = (newData, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(changePasswordStarted());
      await axios
        .patch(`${apiUrl}/change-password`, newData, options)
        .then((res) => {
          if (res.data.success) {
            dispatch(changePasswordSuccess(res.data.message));
          } else {
            dispatch(changePasswordFailed(res.data.message));
          }
        });
    } catch (error) {
      dispatch(changePasswordFailed(error.response.data.message));
    }
  };
};

export const dispatchClearLoginData = () => {
  return async (dispatch) => {
    dispatch(clearLoginData());
  };
};

export const dispatchClearRegisterData = () => {
  return async (dispatch) => {
    dispatch(clearRegisterData());
  };
};

export const dispatchClearChangePasswordData = () => {
  return async (dispatch) => {
    dispatch(clearChangePasswordData());
  };
};

export const dispatchClearNewPasswordData = () => {
  return async (dispatch) => {
    dispatch(clearNewPasswordData());
  };
};

export const dispatchClearResetPasswordData = () => {
  return async (dispatch) => {
    dispatch(clearResetPasswordData());
  };
};
