import React, { Component } from "react";
import axios from "axios";

class SendOTP extends Component {
  constructor() {
    super();
    this.state = {
      otp: "", // Store OTP input
      response: "", // Store response from the API
    };
  }

  handleChange = (e) => {
    this.setState({ otp: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const apiToken = "<YOUR_API_TOKEN>";
    const apiKey = "<YOUR_API_KEY>";

    const options = {
      method: "POST",
      url: "https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp",
      headers: {
        "Content-Type": "application/json",
        Token: apiToken,
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
      },
      data: {
        originator: "SignOTP",
        recipient: "+9715097525xx",
        content: `Greetings from D7 API, your mobile verification code is: ${this.state.otp}`,
        expiry: "600",
        data_coding: "text",
      },
    };

    try {
      const response = await axios.request(options);
      this.setState({ response: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <h2>Send OTP</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            OTP Code:
            <input
              type="text"
              value={this.state.otp}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Send OTP</button>
        </form>
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default SendOTP;
