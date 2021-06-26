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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  isLength,
  isMatch,
} from "../../components/utils/validation/Validation";
import axios from "axios";
import ResetModal from "../Modals/ResetModal";

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
    <>
      <Col lg="6" md="8">
        {success && <ResetModal success={success} />}
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

            <div className="text-center">
              <Button className="mt-4" color="primary" onClick={handleSubmit}>
                Cambiar tu contraseña
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ResetPassword;
