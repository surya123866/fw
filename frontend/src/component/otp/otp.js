import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import OtpInput from "react-otp-input";
import Snackbar from "../snackbar/snackbar";
import { adduserLoginStatus } from "../../actions";

import image from "../../assets/undraw_confirmed_81ex.jpg";

import "./styles.scss";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const Otp = () => {
  const dispatch = useDispatch();
  const mobileNumber = useSelector(
    (state) => state.registrationReducer.mobileNumber
  );
  // console.log(mobileNumber.number);
  const navigate = useNavigate();
  const snackbarRef = useRef(null);
  let otp = localStorage.getItem("OTP");

  const [enteredOTP, setEnteredOtp] = useState();
  const [otpError, setOTPerror] = useState("");
  //console.log(enteredOTP);

  const onResend = () => {
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
        if (response.status === 200) {
          otp = response.data.otp;
          // console.log(response.data);
        }
        snackbarRef.current.show();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (snackbarRef.current) {
        snackbarRef.current.show();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [snackbarRef]);

  const onChangeNumber = () => {
    navigate("/");
  };

  const validateOTP = () => {
    const apiUrl =
      "https://us-central1-otp-authentication-5847a.cloudfunctions.net/app/validate-otp";
    const data = {
      mobileNumber: `${mobileNumber.number}`,
      enteredOTP: `${enteredOTP}`,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    if (enteredOTP === "") {
      setOTPerror("Enter the otp");
    } else {
      axios
        .post(apiUrl, data, { headers: headers })
        .then((response) => {
          setEnteredOtp(response.data.message);
          dispatch(adduserLoginStatus(true));
          Cookies.set("userToken", uuid());
          navigate("/success");
        })
        .catch((error) => {
          setOTPerror("Entered OTP is wrong");
        });
    }
  };

  const handleChangeOtp = (value) => {
    setEnteredOtp(value);
    setOTPerror("");
  };

  return (
    <div className="otp-container">
      <img src={`${image}`} alt="logo" className="logo" />
      <h1>Please verify Mobile number</h1>
      <div className="number-edit-container">
        <p>
          Please sign in to your account<span>{"+" + mobileNumber.number}</span>
        </p>
        <p onClick={onChangeNumber}>Change Phone Number</p>
      </div>
      <div className="otp-input-container">
        <OtpInput
          value={enteredOTP}
          onChange={(value) => handleChangeOtp(value)}
          numInputs={4}
          renderSeparator={<span style={{ width: "8px" }}></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: "solid #e5e5e5 1px",
            borderRadius: "8px",
            width: "48px",
            height: "48px",
            fontSize: "18px",
            color: "#333",
            fontWeight: "500",
            caretColor: "blue",
            fontStyle: "normal",
            fontFamily: "Work Sans",
            boxShadow: "6px 6px 5px 0px rgba(224,222,222,0.75)",
            outlineColor: "#80848c",
          }}
          focusStyle={{
            border: "1px solid #637290",
            outline: "none",
          }}
        />
        {otpError && <p style={{ color: "red" }}>{otpError}</p>}
      </div>
      <div>
        <p>
          Didn’t receive the code?<span onClick={onResend}>Resend</span>
        </p>
        <button className="submit-button" onClick={validateOTP}>
          Verify
        </button>
      </div>
      <Snackbar
        ref={snackbarRef}
        message={`Your OTP is ${otp}`}
        type={SnackbarType.success}
      />
    </div>
  );
};

export default Otp;
