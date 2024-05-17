import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./ChangePassword.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchChangePassword,
  dispatchClearChangePasswordData,
  dispatchLogout,
} from "../../Store/Actions/AuthActions";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.auth.changePasswordData
  );
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");

  const decodeToken = jwtDecode(token);
  const currentToken = Date.now() / 1000;
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [validations, setValidations] = useState({
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
    oldPassword: Yup.string().required("Required*"),
    newPassword: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+?|/])[A-Za-z0-9!@#$%^&*_+?|/]+$/,
        "Password is Invalid"
      ),
    confirmPassword: Yup.string()
      .required("Required*")
      .oneOf([Yup.ref("newPassword"), null], "Password must be matched"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      const newData = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      };

      dispatch(dispatchChangePassword(newData, token));

      values.oldPassword = "";
      values.newPassword = "";
      values.confirmPassword = "";

      setIsChecked(false);
      setShowPassword(false);
    },
  });

  const validationRegex = (value) => {
    let error = {};

    const upperRegex = /(?=.*[A-Z])[A-Z]+/;
    const lowerRegex = /(?=.*[a-z])[a-z]+/;
    const numberRegex = /(?=.*[0-9])[0-9]+/;
    const specialRegex = /(?=.*[!@#$%^&*_+?|/])[!@#$%^&*_+?|/]+/;

    if (upperRegex.test(value)) {
      error.upper = true;
    }
    if (lowerRegex.test(value)) {
      error.lower = true;
    }
    if (numberRegex.test(value)) {
      error.number = true;
    }
    if (specialRegex.test(value)) {
      error.special = true;
    }

    return error;
  };

  useEffect(() => {
    setValidations(validationRegex(formik.values.newPassword));
  }, [formik.values.newPassword]);

  const handleCheckbox = () => {
    setShowPassword(!showPassword);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    document.title =
      window.location.pathname === "/change-password"
        ? "Cinemate | Register"
        : "Cinemate";
    dispatch(dispatchClearChangePasswordData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/login");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  return (
    <>
      <Header />
      <div className="change-password-container">
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
        {successMsg && (
          <Snackbar
            className="notify-bar"
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              className="notify-alert"
            >
              {successMsg}
            </Alert>
          </Snackbar>
        )}
        <div className="change-password-form-container">
          <div className="logo-change-password-title-card">
            <img
              src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710510854/cinemate-logo_1_1_cpuaoq.png"
              alt="logo"
              className="logo"
            />
            <h1 className="change-password-title">Change Password</h1>
          </div>
          <form
            className="change-password-form-card"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <div className="change-password-label-input-card">
              <label htmlFor="oldPassword" className="change-password-label">
                Old Password
              </label>
              <input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="oldPassword"
                value={formik.values.oldPassword}
                placeholder="Enter the old password"
                id="oldPassword"
                className="change-password-input"
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <span className="change-password-error">
                  {formik.errors.oldPassword}
                </span>
              )}
            </div>
            <div className="change-password-label-input-card">
              <label htmlFor="newPassword" className="change-password-label">
                Create New Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
                value={formik.values.newPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Enter the new password"
                id="newPassword"
                className="change-password-input"
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <span className="change-password-error">
                  {formik.errors.newPassword}
                </span>
              )}
            </div>
            <div className="change-password-label-input-card">
              <label
                htmlFor="confirmPassword"
                className="change-password-label"
              >
                Confirm New Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Enter the confirm new password"
                id="confirmPassword"
                className="change-password-input"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="change-password-error">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
            <div className="change-password-check-input-label-card">
              <input
                checked={isChecked ? true : false}
                className="change-password-checkbox-input"
                type="checkbox"
                id="show-password"
                onChange={handleCheckbox}
              />
              <label
                className="change-password-checkbox-label"
                htmlFor="show-password"
              >
                Show Password
              </label>
            </div>
            <div className="valid-card">
              <div className="valid">
                <CircleIcon
                  style={{
                    color: validations.upper ? "#228822" : "#7a7a7a",
                    fontSize: 8,
                    marginRight: 10,
                  }}
                />
                <p
                  style={{
                    textDecoration: validations.upper ? "line-through" : "none",
                    color: validations.upper ? "#228822" : "#7a7a7a",
                  }}
                >
                  At least one upper case character
                </p>
              </div>
              <div className="valid">
                <CircleIcon
                  style={{
                    color: validations.lower ? "#228822" : "#7a7a7a",
                    fontSize: 8,
                    marginRight: 10,
                  }}
                />
                <p
                  style={{
                    textDecoration: validations.lower ? "line-through" : "none",
                    color: validations.lower ? "#228822" : "#7a7a7a",
                  }}
                >
                  At least one lower case character
                </p>
              </div>
              <div className="valid">
                <CircleIcon
                  style={{
                    color: validations.number ? "#228822" : "#7a7a7a",
                    fontSize: 8,
                    marginRight: 10,
                  }}
                />
                <p
                  style={{
                    textDecoration: validations.number
                      ? "line-through"
                      : "none",
                    color: validations.number ? "#228822" : "#7a7a7a",
                  }}
                >
                  At least one number
                </p>
              </div>
              <div className="valid">
                <CircleIcon
                  style={{
                    color: validations.special ? "#228822" : "#7a7a7a",
                    fontSize: 8,
                    marginRight: 10,
                  }}
                />
                <p
                  style={{
                    textDecoration: validations.special
                      ? "line-through"
                      : "none",
                    color: validations.special ? "#228822" : "#7a7a7a",
                  }}
                >
                  At least one special character
                </p>
              </div>
            </div>
            <button
              style={{ backgroundColor: isLoading ? "#848484" : "#b01e4d" }}
              type="submit"
              className="change-password-button"
            >
              Change Password
              {isLoading && <div className="change-loader"></div>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
