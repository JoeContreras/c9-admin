import React, { useEffect, useState } from "react";
import {
  UncontrolledAlert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const EditModal = (props) => {
  const { id } = props;
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      // setErr("This user does not exist");
      console.log("This user does not exist");
    }
  }, [users, id]);
  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          { headers: { Authorization: token } }
        );
        setSuccess(res.data.msg);
        props.setCall(!props.call);
        setNum(0);
        props.toggleModal();
      }
    } catch (e) {
      e.response.data.msg && setErr(e.response.data.msg);
    }
  };
  const handleCheck = () => {
    setErr("");
    setSuccess("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };
  return (
    <Modal
      className="modal-dialog-centered"
      size="sm"
      isOpen={props.modalState}
      toggle={() => props.toggleModal()}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Editar permisos de usuario</small>
            </div>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="name" defaultValue={editUser.name} disabled />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="email" defaultValue={editUser.email} disabled />
              </InputGroup>
            </FormGroup>
            <div className="custom-control custom-control-alternative custom-checkbox">
              <input
                className="custom-control-input"
                id=" customCheckLogin"
                type="checkbox"
                checked={checkAdmin}
                onChange={handleCheck}
              />
              <label
                className="custom-control-label"
                htmlFor=" customCheckLogin"
              >
                <span className="text-muted">Administrador</span>
              </label>
            </div>
            <div className="text-center">
              <Button className="my-4" color="primary" onClick={handleUpdate}>
                Actualizar
              </Button>
            </div>{" "}
            {err && (
              <UncontrolledAlert color="danger" fade={false}>
                <span className="alert-inner--text">
                  <strong>Error! </strong> {err}
                </span>
              </UncontrolledAlert>
            )}
            {/*
            {success && (
              <UncontrolledAlert color="primary" fade={false}>
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Exito! </strong> El rol fue actualizado.
                </span>
              </UncontrolledAlert>
            )}
*/}
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default EditModal;
