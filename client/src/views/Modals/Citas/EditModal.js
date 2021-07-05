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
import { isPhone } from "../../../components/utils/validation/Validation";
import moment from "moment";

const initialState = {
  nombre: "",
  fecha: new Date(),
  lugar: "",
  telefono: "",
  err: "",
  success: "",
};
const EditModal = (props) => {
  const { id } = props;
  const citas = useSelector((state) => state.citas);
  const token = useSelector((state) => state.token);

  const [editCita, setEditCita] = useState([]);
  const [newCita, setNewCita] = useState(initialState);

  const { nombre, fecha, lugar, telefono, err, success } = newCita;

  useEffect(() => {
    if (citas.length !== 0) {
      citas.forEach((cita) => {
        if (cita._id === id) {
          setEditCita(cita);
        }
      });
    } else {
      console.log("This cita does not exist");
    }
  }, [citas, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCita({ ...newCita, [name]: value, err: "", success: "" });
  };

  const handleDate = (date) => {
    setNewCita({ ...newCita, fecha: date });
  };
  const handleUpdate = async () => {
    if (telefono) {
      if (!isPhone(telefono)) {
        return setNewCita({
          ...newCita,
          err: "Please enter a valid phone number",
          success: "",
        });
      }
    }
    try {
      await axios.patch(
        `/admin/citas/${editCita._id}`,
        {
          nombre: nombre ? nombre : editCita.nombre,
          fecha: fecha ? fecha : editCita.fecha,
          lugar: lugar ? lugar : editCita.lugar,
          telefono: telefono ? telefono : editCita.telefono,
        },
        { headers: { Authorization: token } }
      );
      setNewCita({ ...newCita, err: "", success: "Cita Actualizada" });
      props.setCall(!props.callback);
      props.toggleModal();
    } catch (e) {
      setNewCita({ ...newCita, err: e.response.data.msg, success: "" });
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
              <small>Editar detalles de cita</small>
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
                  defaultValue={editCita.nombre}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  /*initialValue={moment(editCita.fecha).format(
                    "MMMM Do YYYY, h:mm a"
                  )}*/
                  initialValue={editCita.fecha}
                  value={fecha}
                  onChange={handleDate}
                  inputProps={{
                    placeholder: "Fecha de Cita",
                    autoComplete: "off",
                  }}
                  timeFormat={true}
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
                  name="lugar"
                  id="lugar"
                  defaultValue={editCita.lugar}
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
                  defaultValue={editCita.telefono}
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
