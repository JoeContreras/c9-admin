import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  const { name, email, password, cf_password, err, success } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Please fill in all fields",
        success: "",
      });
    }
    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Please enter a valid email address",
        success: "",
      });
    }
    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be at least 6 characters long",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: "Passwords do not match",
        success: "",
      });
    }
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
        cf_password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
    } catch (e) {
      e.response.data.msg &&
        setUser({
          ...user,
          err: e.response.data.msg,
          success: "",
        });
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  return (
    <div className="login_page">
      <h2>Login</h2>

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="cf_password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            id="cf_password"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
