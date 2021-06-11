import React, { useState } from "react";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isEmail } from "../../utils/validation/Validation";
import axios from "axios";

const initialState = {
  email: "",
  err: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async () => {
    if (!isEmail(email)) {
      return setData({
        ...data,
        err: "Enter a valid Email Address",
        success: "",
      });
    }
    try {
      const res = await axios.post("/user/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (e) {
      e.response.data.msg &&
        setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };
  return (
    <div className="fg_pass">
      <h2>Forgot password</h2>
      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="email">Enter your Email Address</label>
        <input
          type="text"
          name="email"
          value={email}
          id="email"
          onChange={handleChangeInput}
        />
        <button onClick={handleSubmit}>Verify your Email Address</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
