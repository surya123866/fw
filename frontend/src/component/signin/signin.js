import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Snackbar from "../snackbar/snackbar";
import { addUserNumber } from "../../actions";

import "./signin.scss";
import logo from "../../assets/AK_logo.jpg";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileNumber, setmobileNumber] = useState();
  const [phoneError, setPhoneError] = useState("");
  const [notification, setNotification] = useState("");
  const snackbarRef = useRef(null);

  const isPhoneNumberValid = (mobileNumber) => {
    const phoneRegex = /^[0-9]{12}$/;
    return phoneRegex.test(mobileNumber);
  };

  const handlePhoneChange = (value) => {
    setmobileNumber(value);
    setPhoneError("");
  };

  const handleSubmit = () => {
    if (!isPhoneNumberValid(mobileNumber)) {
      setPhoneError("Invalid phone number");
      return;
    }
    setPhoneError("");
    generateOTP();
    setTimeout(() => {
      snackbarRef.current.show();
    }, 2000);
  };

  const generateOTP = () => {
    const apiUrl =
      "https://us-central1-otp-authentication-5847a.cloudfunctions.net/app/generate-otp";
    const data = {
      mobileNumber: mobileNumber,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(apiUrl, data, { headers: headers })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("OTP", response.data.otp);
          setNotification("OTP Sent Successfully!");
          setTimeout(() => {
            dispatch(addUserNumber(mobileNumber));
            //console.log(mobileNumber);
            navigate("/otp");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setNotification(`${error.message}`);
      });
  };

  return (
    <div className="signin-container">
      <img src={`${logo}`} alt="logo" className="logo" />
      <div className="welcome-text">
        <h1>Welcome Back</h1>
        <p>Please sign in to your account</p>
      </div>
      <div>
        <div className="number-input-container">
          <PhoneInput
            inputProps={{
              name: "contact",
              required: true,
              autoFocus: true,
            }}
            className="input"
            country={"in"}
            value={mobileNumber}
            onChange={(value) => handlePhoneChange(value)}
            inputStyle={{
              border: "1px solid #ffd37d",
              borderRadius: "5px",
              width: "343px",
              height: "44px",
              fontSize: "18px",
              color: "#333",
              fontWeight: "500",
              caretColor: "blue",
              fontStyle: "normal",
              fontFamily: "Work Sans",
            }}
            containerStyle={{
              border: "none",
              backgroundColor: "none",
            }}
          />
        </div>
        {phoneError ? (
          <p className="error-message">{phoneError}</p>
        ) : (
          <p>We will send you a one time SMS message. Charges may apply.</p>
        )}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Sign In with OTP
      </button>
      <Snackbar
        ref={snackbarRef}
        message={notification}
        type={SnackbarType.success}
      />
    </div>
  );
};

export default Signin;
