import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar, Tooltip, useMediaQuery } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchClearRegisterData,
  dispatchRegister,
} from "../../Store/Actions/AuthActions";

function Register() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.auth.registerData
  );

  const passwordTooltip = {
    text: "You must provide the password in the below cases.",
    examples: [
      "At least one upper case [A-Z]",
      "At least one lower case [a-z]",
      "At least one special [!@#$%^&*_+?|/]",
      "At least one number [0-9]",
    ],
  };

  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

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
      .max(12, "password must be max 12 charactors")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+?|/])[A-Za-z0-9!@#$%^&*_+?|/]+$/,
        "Password is Invalid"
      ),
    confirmPassword: Yup.string()
      .required("Required*")
      .oneOf([Yup.ref("password"), null], "password must be matched"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      const newData = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      dispatch(dispatchRegister(newData));

      values.email = "";
      values.password = "";
      values.confirmPassword = "";

      setIsChecked(false);
      setShowPassword(false);
    },
  });

  const handleCheckbox = () => {
    setShowPassword(!showPassword);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    document.title =
      window.location.pathname === "/register"
        ? "Cinemate | Register"
        : "Cinemate";
    dispatch(dispatchClearRegisterData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="register-container">
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
        <div className="register-card-container">
          <div className="register-card"></div>
          <div className="register-form-container">
            <div className="logo-register-title-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710510854/cinemate-logo_1_1_cpuaoq.png"
                alt="logo"
              />
              <h1 className="register-title">Register</h1>
            </div>
            <form
              className="register-form-card"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="register-label-input-card">
                <label htmlFor="email" className="register-label">
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
                  className="register-input"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="register-error">{formik.errors.email}</span>
                )}
              </div>
              <div
                className="register-label-input-card"
                style={{ marginBottom: 5 }}
              >
                <label htmlFor="password" className="register-label custom">
                  Create Password
                  <span style={{ marginLeft: 5, marginBottom: 2 }}>
                    <ToolTip
                      data={passwordTooltip}
                      tooltipOpen={tooltipOpen}
                      handleTooltipClose={handleTooltipClose}
                      handleTooltipOpen={handleTooltipOpen}
                    />
                  </span>
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the password"
                  id="password"
                  className="register-input"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="register-error">
                    {formik.errors.password}
                  </span>
                )}
              </div>
              <div className="register-label-input-card">
                <label htmlFor="confirmPassword" className="register-label">
                  Confirm Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the confirm password"
                  id="confirmPassword"
                  className="register-input"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className="register-error">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>
              <div className="register-check-input-label-card">
                <input
                  checked={isChecked ? true : false}
                  className="register-checkbox-input"
                  type="checkbox"
                  id="show-password"
                  onChange={handleCheckbox}
                />
                <label
                  className="register-checkbox-label"
                  htmlFor="show-password"
                >
                  Show Password
                </label>
              </div>
              <button
                style={{ backgroundColor: isLoading ? "#848484" : "#b01e4d" }}
                type="submit"
                className="register-button"
              >
                Register
                {isLoading && <div className="register-loader"></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

export const ToolTip = (props) => {
  return (
    <Tooltip
      onClose={props.handleTooltipClose}
      open={props.tooltipOpen}
      title={
        <div style={{ padding: 14, width: 200 }}>
          <p style={{ marginBottom: 5 }}>{props.data.text}</p>
          <ul style={{ paddingLeft: 12, marginBottom: 1 }}>
            {props.data.examples.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </ul>
        </div>
      }
      placement="bottom-start"
    >
      <InfoOutlinedIcon
        onClick={props.handleTooltipOpen}
        className="icon"
        style={{ fontSize: 15 }}
      />
    </Tooltip>
  );
};
