import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  UncontrolledAlert,
} from "reactstrap";

import { isEmail } from "../../components/utils/validation/Validation";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <>
      <Col lg="6" md="8">
        {success && (
          <UncontrolledAlert className="alert-default" fade={false}>
            <span className="alert-inner--text">
              <strong>Success!</strong> {success}
            </span>
          </UncontrolledAlert>
        )}
        {err && (
          <UncontrolledAlert color="danger" fade={false}>
            <span className="alert-inner--text">
              <strong>Error!</strong> {err}
            </span>
          </UncontrolledAlert>
        )}
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Cual es su Correo Electronico?</small>
            </div>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  name="email"
                  onChange={handleChangeInput}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="mt-4" color="primary" onClick={handleSubmit}>
                Verificar tu Email
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ForgotPassword;
