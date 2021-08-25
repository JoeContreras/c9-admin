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
  Modal,
  Row,
  Col,
  Alert,
} from "reactstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [modalState, setModalState] = useState(true);

  /*
  const toggleModal = (state) => {
    setModalState({
      [state]: !modalState[state],
    });
  };
*/
  const toggleModal = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (e) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <>
      {/* Button trigger modal */}
      {/*
      <Button
        color="primary"
        type="button"
        onClick={() => toggleModal("exampleModal")}
      >
        Launch demo modal
      </Button>
*/}
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={modalState}
        toggle={() => toggleModal()}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Activacion de Cuenta de Usuario
          </h5>
        </div>
        <div className="modal-body">
          {success && (
            <Alert className="alert-default">
              <strong>Success!</strong> {success}
            </Alert>
          )}
          {err && (
            <Alert className="secondary">
              <strong>Error!</strong>
              {err}
            </Alert>
          )}
        </div>
        <div className="modal-footer">
          <Link color="primary" to="/auth/login">
            Iniciar Sesion
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ActivationEmail;
