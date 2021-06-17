import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { Link } from "react-router-dom";
import {
  dispatchGetAllCitas,
  fetchAllCitas,
} from "../../../redux/actions/citaAction";
import { isPhone } from "../../utils/validation/Validation";

const initialState = {
  nombre: "",
  fecha: "",
  lugar: "",
  telefono: "",
  err: "",
  success: "",
};
const Citas = () => {
  const token = useSelector((state) => state.token);
  const citas = useSelector((state) => state.citas);

  const [data, setData] = useState(initialState);
  const { nombre, fecha, lugar, telefono, err, success } = data;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllCitas(token).then((res) => {
      dispatch(dispatchGetAllCitas(res));
    });
  }, [token, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const createCita = async () => {
    if (!isPhone(telefono)) {
      return setData({
        ...data,
        err: "Please enter a valid phone number",
        success: "",
      });
    }
    try {
      const res = await axios.post(
        "/admin/citas",
        {
          nombre: nombre,
          fecha: fecha,
          lugar: lugar,
          telefono: telefono,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData({ ...data, err: "", success: res.data.msg });
      setCallback(!callback);
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Seguro que deseas borrar este cliente?")) {
        setLoading(true);
        await axios.delete(`/admin/citas/${id}`, {
          headers: { Authorization: token },
        });
        setLoading(false);
        setCallback(!callback);
      }
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      {loading && <h3>Loading...</h3>}
      <div className="profile_page">
        <div className="col-left">
          <h2>Crear Cita</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="name"
              value={nombre}
              placeholder="Nombre Completo"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreEmpresa">Fecha de la Cita</label>
            <input
              type="text"
              name="fecha"
              id="fecha"
              value={fecha}
              placeholder="Fecha de la Cita"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Lugar de la Cita</label>
            <input
              type="text"
              name="lugar"
              id="lugar"
              value={lugar}
              placeholder="Direccion"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              value={telefono}
              placeholder="Numero de Telefono"
              onChange={handleChange}
            />
          </div>
          <button disabled={loading} onClick={createCita}>
            Crear Cita
          </button>
        </div>

        <div className="col-right">
          <h2>Citas Actuales</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Lugar</th>
                  <th>Telefono</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita._id}>
                    <td>{cita.nombre}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.lugar}</td>
                    <td>{cita.telefono}</td>
                    <td>
                      <Link to={`/cita-update/${cita._id}`}>
                        <i className="fas fa-edit" title="Edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash-alt"
                        onClick={() => handleDelete(cita._id)}
                        title="Remove"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Citas;
