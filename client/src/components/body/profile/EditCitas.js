import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";

const initialState = {
  nombre: "",
  fecha: "",
  lugar: "",
  telefono: "",
  err: "",
  success: "",
};
const EditCita = () => {
  const { id } = useParams();
  const history = useHistory();

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
      history.push("/adminCitas");
    }
  }, [citas, id, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCita({ ...newCita, [name]: value, err: "", success: "" });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
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
    } catch (e) {
      setNewCita({ ...newCita, err: e.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="profile_page edit_user">
        <div className="row">
          <button onClick={() => history.goBack()} className="go_back">
            <i className="fas fa-long-arrow-alt-left"></i>Go Back
          </button>
        </div>
        <div className="col-left">
          <h2>Edit User</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              defaultValue={editCita.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreEmpresa">Fecha de la cita</label>
            <input
              type="text"
              name="fecha"
              id="fecha"
              defaultValue={editCita.fecha}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Lugar de la cita</label>
            <input
              type="text"
              name="lugar"
              id="lugar"
              defaultValue={editCita.lugar}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              defaultValue={editCita.telefono}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleUpdate}>Update</button>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
      </div>
    </>
  );
};

export default EditCita;
