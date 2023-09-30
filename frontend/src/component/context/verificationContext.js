import React from "react";

const verificationContext = React.createContext({
  activePhoneNumber: "",
  changePhoneNumber: () => {},
});

export default verificationContext;
