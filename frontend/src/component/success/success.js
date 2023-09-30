import React, { useEffect, useRef } from "react";
import Snackbar from "../snackbar/snackbar";

import "./styles.scss";

import image from "../../assets/Artboard 1.jpg";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const Success = () => {
  const snackbarRef = useRef(null);

  useEffect(() => {
    snackbarRef.current.show();
  });

  return (
    <div className="success-container">
      <img src={`${image}`} alt="logo" className="logo" />
      <div className="welcome-admit-text">
        <h1>Welcome to AdmitKard</h1>
        <p>
          In order to provide you with a custom experience,
          <span>we need to ask you a few questions.</span>
        </p>
      </div>
      <div className="button-container">
        <button className="submit-button">Get Started</button>
        <p>*This will only take 5 min.</p>
      </div>
      <Snackbar
        ref={snackbarRef}
        message="user is verified successfully"
        type={SnackbarType.success}
      />
    </div>
  );
};

export default Success;
