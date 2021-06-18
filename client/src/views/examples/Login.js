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
import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  dispatchGetUser,
  dispatchLogin,
  fetchUser,
} from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
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
      history.push("/");
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
      history.push("/");
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
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
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
              <small>Or sign in with credentials</small>
            </div>
            <Form onSubmit={handleSubmit} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    value={email}
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
                    autoComplete="new-password"
                    name="password"
                    value={password}
                    onChange={handleChangeInput}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
