import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./ResetPassword.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchClearResetPasswordData,
  dispatchResetPassword,
} from "../../Store/Actions/AuthActions";

function ResetPassword() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.auth.resetPasswordData
  );
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const validate = Yup.object({
    email: Yup.string().required("Required*").email("Email is Invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      const newData = {
        email: values.email.toLowerCase(),
      };

      dispatch(dispatchResetPassword(newData));

      values.email = "";
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/reset-password"
        ? "Cinemate | Reset Password"
        : "Cinemate";
    dispatch(dispatchClearResetPasswordData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpenErr(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="reset-password-container">
        {errorMsg && (
          <Snackbar
            className="notify-bar"
            open={openErr}
            autoHideDuration={2000}
            onClose={handleClosed}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClosed}
              severity="error"
              variant="filled"
              className="notify-alert"
            >
              {errorMsg}
            </Alert>
          </Snackbar>
        )}
        <div className="reset-password-card-container">
          <div className="reset-password-card"></div>
          <div className="reset-password-form-container">
            <div className="logo-reset-password-title-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710510854/cinemate-logo_1_1_cpuaoq.png"
                alt="logo"
                className="logo"
              />
              <h1 className="reset-password-title">Reset Password</h1>
            </div>
            <form
              className="reset-password-form-card"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="reset-password-label-input-card">
                <label htmlFor="email" className="reset-password-label">
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
                  className="reset-password-input"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="reset-password-error">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <button
                style={{ backgroundColor: isLoading ? "#848484" : "#b01e4d" }}
                type="submit"
                className="reset-password-button"
              >
                Reset
                {isLoading && <div className="reset-loader"></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
      {successMsg && isSuccess && (
        <Snackbar
          open={open}
          style={{ marginBottom: 5 }}
          color="white"
          autoHideDuration={1000}
          onClose={handleClose}
          message={successMsg}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        />
      )}
    </>
  );
}

export default ResetPassword;
