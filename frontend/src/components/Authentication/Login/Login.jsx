import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchClearLoginData,
  dispatchLogin,
} from "../../Store/Actions/AuthActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, errorMsg } = useSelector((state) => state.auth.loginData);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
    email: Yup.string().required("Required*").email("Email is Invalid"),
    password: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      const newData = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      dispatch(dispatchLogin(newData));

      values.email = "";
      values.password = "";
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/login" ? "Cinemate | Login" : "Cinemate";
    dispatch(dispatchClearLoginData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="login-container">
        {errorMsg && (
          <Snackbar
            className="notify-bar"
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              className="notify-alert"
            >
              {errorMsg}
            </Alert>
          </Snackbar>
        )}
        <div className="login-card-container">
          <div className="login-card"></div>
          <div className="login-form-container">
            <div className="logo-login-title-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710510854/cinemate-logo_1_1_cpuaoq.png"
                alt="logo"
              />
              <h1 className="login-title">Login</h1>
            </div>
            <form
              className="login-form-card"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="login-label-input-card">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <input
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  value={formik.values.email}
                  placeholder="Enter the email"
                  id="email"
                  className="login-input"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="login-error">{formik.errors.email}</span>
                )}
              </div>
              <div className="login-label-input-card">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  type="password"
                  placeholder="Enter the password"
                  id="password"
                  className="login-input"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="login-error">{formik.errors.password}</span>
                )}
              </div>
              <p
                className="login-forget-button"
                onClick={() => navigate("/reset-password")}
              >
                Forget Your Password?
              </p>
              <button
                style={{ backgroundColor: isLoading ? "#848484" : "#b01e4d" }}
                type="submit"
                className="login-button"
              >
                Login
                {isLoading && <div className="login-loader"></div>}
              </button>
            </form>
            <div className="login-account-card">
              <p className="login-account">Do you have an account?</p>
              <span
                className="login-register-button"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
