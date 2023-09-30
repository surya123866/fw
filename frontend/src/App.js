import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components

import Signin from "./component/signin/signin";
import Otp from "./component/otp/otp";
import Success from "./component/success/success";
import ProtectedRoute from "./component/protectdRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
