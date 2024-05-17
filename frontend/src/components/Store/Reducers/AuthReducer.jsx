import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    loginData: {
      token: null,
      isSuccess: false,
      errorMsg: "",
    },
    registerData: {
      isSuccess: false,
      errorMsg: "",
      successMsg: "",
    },
    resetPasswordData: {
      isSuccess: false,
      errorMsg: "",
      successMsg: "",
    },
    changePasswordData: {
      isSuccess: false,
      errorMsg: "",
      successMsg: "",
    },
    newPasswordData: {
      isSuccess: false,
      errorMsg: "",
      successMsg: "",
    },
  },
  reducers: {
    registerStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        registerData: {
          ...state.registerData,
          isSuccess: false,
          errorMsg: "",
          successMsg: "",
        },
      };
    },

    registerSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        registerData: {
          ...state.registerData,
          isSuccess: true,
          successMsg: action.payload,
          errorMsg: "",
        },
      };
    },

    registerFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        registerData: {
          ...state.registerData,
          isSuccess: false,
          successMsg: "",
          errorMsg: action.payload,
        },
      };
    },

    clearRegisterData: (state, action) => {
      return {
        ...state,
        isLoading: false,
        registerData: {
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },

    loginStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        loginData: {
          ...state.loginData,
          isSuccess: false,
          errorMsg: "",
        },
      };
    },

    loginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        loginData: {
          ...state.loginData,
          isSuccess: true,
          token: action.payload,
          errorMsg: "",
        },
      };
    },

    loginFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        loginData: {
          ...state.loginData,
          isSuccess: false,
          errorMsg: action.payload,
        },
      };
    },

    clearLoginData: (state, action) => {
      return {
        ...state,
        isLoading: false,
        loginData: {
          isSuccess: false,
          errorMsg: "",
          token: null,
        },
      };
    },

    logout: (state, action) => {
      return {
        ...state,
        isLoading: false,
        loginData: {
          ...state.loginData,
          token: null,
          isSuccess: false,
          errorMsg: "",
        },
      };
    },

    resetPasswordStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        resetPasswordData: {
          ...state.resetPasswordData,
          errorMsg: "",
          successMsg: "",
          isSuccess: false,
        },
      };
    },

    resetPasswordSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        resetPasswordData: {
          ...state.resetPasswordData,
          errorMsg: "",
          successMsg: action.payload,
          isSuccess: true,
        },
      };
    },

    resetPasswordFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        resetPasswordData: {
          ...state.resetPasswordData,
          errorMsg: action.payload,
          successMsg: "",
          isSuccess: false,
        },
      };
    },

    clearResetPasswordData: (state, action) => {
      return {
        ...state,
        isLoading: false,
        resetPasswordData: {
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },

    newPasswordStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        newPasswordData: {
          ...state.newPasswordData,
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },

    newPasswordSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        newPasswordData: {
          ...state.newPasswordData,
          isSuccess: true,
          successMsg: action.payload,
          errorMsg: "",
        },
      };
    },

    newPasswordFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        newPasswordData: {
          ...state.newPasswordData,
          isSuccess: false,
          successMsg: "",
          errorMsg: action.payload,
        },
      };
    },

    clearNewPasswordData: (state, action) => {
      return {
        ...state,
        isLoading: false,
        newPasswordData: {
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },

    changePasswordStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
        changePasswordData: {
          ...state.changePasswordData,
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },

    changePasswordSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        changePasswordData: {
          ...state.changePasswordData,
          isSuccess: true,
          successMsg: action.payload,
          errorMsg: "",
        },
      };
    },

    changePasswordFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        changePasswordData: {
          ...state.changePasswordData,
          isSuccess: false,
          successMsg: "",
          errorMsg: action.payload,
        },
      };
    },

    clearChangePasswordData: (state, action) => {
      return {
        ...state,
        isLoading: false,
        changePasswordData: {
          isSuccess: false,
          successMsg: "",
          errorMsg: "",
        },
      };
    },
  },
});

export const {
  registerStarted,
  registerSuccess,
  registerFailed,
  clearRegisterData,
  loginStarted,
  loginSuccess,
  loginFailed,
  clearLoginData,
  logout,
  resetPasswordStarted,
  resetPasswordSuccess,
  resetPasswordFailed,
  clearResetPasswordData,
  newPasswordStarted,
  newPasswordSuccess,
  newPasswordFailed,
  clearNewPasswordData,
  changePasswordStarted,
  changePasswordSuccess,
  changePasswordFailed,
  clearChangePasswordData,
} = AuthReducer.actions;

export default AuthReducer.reducer;
