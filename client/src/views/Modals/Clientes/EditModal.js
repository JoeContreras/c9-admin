import React, { useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
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
import {
  isEmail,
  isPhone,
} from "../../../components/utils/validation/Validation";

const initialState = {
  nombre: "",
  nombreEmpresa: "",
  correo: "",
  telefono: "",
  err: "",
  success: "",
};
const EditModal = (props) => {
  const { id } = props;

  const clientes = useSelector((state) => state.clientes);

  const [editCliente, setEditCliente] = useState([]);
  const [newCliente, setNewCliente] = useState(initialState);

  const { nombre, nombreEmpresa, correo, telefono, err, success } = newCliente;

  useEffect(() => {
    if (clientes.length !== 0) {
      clientes.forEach((cliente) => {
        if (cliente._id === id) {
          setEditCliente(cliente);
        }
      });
    } else {
      console.log("This cliente does not exist");
    }
  }, [clientes, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value, err: "", success: "" });
  };

  const handleUpdate = async () => {
    if (correo) {
      if (!isEmail(correo)) {
        return setNewCliente({
          ...newCliente,
          err: "Please enter a valid email address",
          success: "",
        });
      }
    }

    if (telefono) {
      if (!isPhone(telefono)) {
        return setNewCliente({
          ...newCliente,
          err: "Please enter a valid phone number",
          success: "",
        });
      }
    }
    try {
      const res = await axios.patch(
        `/admin/clientes/${editCliente._id}`,
        {
          nombre: nombre ? nombre : editCliente.nombre,
          nombreEmpresa: nombreEmpresa
            ? nombreEmpresa
            : editCliente.nombreEmpresa,
          correo: correo ? correo : editCliente.correo,
          telefono: telefono ? telefono : editCliente.telefono,
        },
        { headers: { Authorization: props.token } }
      );
      // setNewCliente({ ...newCliente, err: "", success: res.data.msg });
      setNewCliente({ ...newCliente, err: "", success: "Cliente Actualizado" });
      props.setCall(!props.callback);
      props.toggleModal();
    } catch (e) {
      // setNewCliente({ ...newCliente, err: e.response.data.msg, success: "" });
      setNewCliente({ ...newCliente, err: e.response.data.msg, success: "" });
    }
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
              <small>Editar Informacion de cliente</small>
            </div>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="nombre"
                  id="nombre"
                  defaultValue={editCliente.nombre}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="nombreEmpresa"
                  id="nombreEmpresa"
                  defaultValue={editCliente.nombreEmpresa}
                  onChange={handleChange}
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
                  name="correo"
                  id="correo"
                  defaultValue={editCliente.correo}
                  onChange={handleChange}
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
                  name="telefono"
                  id="telefono"
                  defaultValue={editCliente.telefono}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
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
