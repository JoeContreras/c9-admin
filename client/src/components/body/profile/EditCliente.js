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
  nombreEmpresa: "",
  correo: "",
  telefono: "",
};
const EditUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const clientes = useSelector((state) => state.clientes);
  const token = useSelector((state) => state.token);

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editCliente, setEditCliente] = useState([]);
  const [newCliente, setNewCliente] = useState(initialState);

  const { nombre, nombreEmpresa, correo, telefono } = newCliente;

  useEffect(() => {
    if (clientes.length !== 0) {
      clientes.forEach((cliente) => {
        if (cliente._id === id) {
          setEditCliente(cliente);
        }
      });
    } else {
      history.push("/adminClientes");
    }
  }, [clientes, id, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value, err: "", success: "" });
  };

  const handleUpdate = async () => {
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
        { headers: { Authorization: token } }
      );
      // setNewCliente({ ...newCliente, err: "", success: res.data.msg });
      setSuccess("Cliente Actualizado");
    } catch (e) {
      // setNewCliente({ ...newCliente, err: e.response.data.msg, success: "" });
      e.response.data.msg && setErr(e.response.data.msg);
    }
  };

  const handleCheck = () => {
    setErr("");
    setSuccess("");
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
              defaultValue={editCliente.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreEmpresa">Nombre Empresa</label>
            <input
              type="text"
              name="nombreEmpresa"
              id="nombreEmpresa"
              defaultValue={editCliente.nombreEmpresa}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Email</label>
            <input
              type="text"
              name="correo"
              id="correo"
              defaultValue={editCliente.correo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              defaultValue={editCliente.telefono}
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

export default EditUser;
