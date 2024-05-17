import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./NewPassword.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchClearNewPasswordData,
  dispatchNewPassword,
} from "../../Store/Actions/AuthActions";
import { useParams } from "react-router-dom";

function NewPassword() {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.id;
  const token = params.token;

  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.auth.newPasswordData
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const passwordTooltip = {
    text: "You must provide the password in the below cases.",
    examples: [
      "At least one upper case [A-Z]",
      "At least one lower case [a-z]",
      "At least one special [!@#$%^&*_+?|/]",
      "At least one number [0-9]",
    ],
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
    password: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+?|/])[A-Za-z0-9!@#$%^&*_+?|/]+$/,
        "Password is Invalid"
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      const newData = {
        password: values.password,
      };

      dispatch(dispatchNewPassword(id, token, newData));

      values.password = "";

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
      window.location.pathname === `/reset/${id}/${token}`
        ? "Cinemate | New Password"
        : "Cinemate";
    dispatch(dispatchClearNewPasswordData());
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
      <div className="new-password-container">
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
        <div className="new-password-card-container">
          <div className="new-password-card"></div>
          <div className="new-password-form-container">
            <div className="logo-new-password-title-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710510854/cinemate-logo_1_1_cpuaoq.png"
                alt="logo"
                className="logo"
              />
              <h1 className="new-password-title">New Password</h1>
            </div>
            <form
              className="new-password-form-card"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="new-password-label-input-card">
                <div className="password-tooltip-card">
                  <label
                    htmlFor="password"
                    className="new-password-label new-custom"
                  >
                    Create New Password
                  </label>
                  <ToolTip data={passwordTooltip} />
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the new password"
                  id="password"
                  className="new-password-input"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="new-password-error">
                    {formik.errors.password}
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
                className="new-password-button"
              >
                New Password
                {isLoading && <div className="new-loader"></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPassword;

export const ToolTip = (props) => {
  return (
    <Tooltip
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
      <InfoOutlinedIcon style={{ fontSize: 15 }} className="icon" />
    </Tooltip>
  );
};
