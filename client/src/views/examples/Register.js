/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../components/utils/validation/Validation";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { dispatchLogin } from "../../redux/actions/authAction";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();
  const history = useHistory();
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
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/admin/user-profile");
    } catch (e) {
      e.response.data.msg &&
        setUser({
          ...user,
          err: e.response.data.msg,
          success: "",
        });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/admin/user-profile");
    } catch (e) {
      e.response.data.msg &&
        setUser({
          ...user,
          err: e.response.data.msg,
          success: "",
        });
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <FacebookLogin
                appId="937021713532051"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={renderProps.onClick}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/Facebook_icon_2013.svg.png")
                            .default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Facebook</span>
                  </Button>
                )}
              />
              <GoogleLogin
                clientId="474523247593-jkgm5peikns2cs0hiuegv7nrafie0itk.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/icons/common/google.svg")
                            .default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                )}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nombre Completo"
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleChangeInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={handleChangeInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChangeInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={cf_password}
                    name="cf_password"
                    onChange={handleChangeInput}
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Crear Cuenta
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/auth/login">
              <small>Ya tienes una cuenta?</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
