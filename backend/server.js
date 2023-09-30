const express = require("express");
const bodyParser = require("body-parser");
const otpGenerator = require("otp-generator");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const otpStore = new Map();

app.post("/generate-otp", (req, res) => {
  const { mobileNumber } = req.body;
  // console.log("Register:", req.body);
  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required." });
  }
  // const otp = otpGenerator.generate(4, {
  //   digits: true,
  //   alphabets: false,
  //   upperCase: false,
  //   specialChars: false,
  // });

  const otp = Math.floor(1000 + Math.random() * 9000);

  otpStore.set(mobileNumber, otp);

  // Return the generated OTP in the response
  res.status(200).json({ otp });
});

app.post("/validate-otp", (req, res) => {
  const { mobileNumber, enteredOTP } = req.body;
  //console.log("Validation:", req.body);

  if (!mobileNumber || !enteredOTP) {
    return res
      .status(400)
      .json({ error: "Mobile number and OTP are required." });
  }

  const storedOTP = otpStore.get(mobileNumber);
  if (storedOTP == enteredOTP) {
    otpStore.delete(mobileNumber);
    res.status(200).json({ message: "OTP verified successfully." });
  } else {
    res.status(400).json({ error: "OTP verification failed." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
