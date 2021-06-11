import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";
import axios from "axios";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async () => {
    if (isLength(password)) {
      return setData({
        ...data,
        err: "Password must be at least 6 characters long",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setData({
        ...data,
        err: "Passwords do not match",
        success: "",
      });
    }
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (e) {
      e.response.data.msg &&
        setData({
          ...data,
          err: e.response.data.msg,
          success: "",
        });
    }
  };
  return (
    <div className="fg_pass">
      <h2>Reset Your Password</h2>
      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={handleChangeInput}
        />
        <label htmlFor="cf_password">Confirm Password</label>
        <input
          type="password"
          name="cf_password"
          value={cf_password}
          id="cf_password"
          onChange={handleChangeInput}
        />
        <button onClick={handleSubmit}>Reset your Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
