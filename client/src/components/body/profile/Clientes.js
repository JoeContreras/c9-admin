import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { Link } from "react-router-dom";
import {
  dispatchGetAllClientes,
  fetchAllClientes,
} from "../../../redux/actions/clientesAction";
import { isEmail, isPhone } from "../../utils/validation/Validation";

const initialState = {
  nombre: "",
  nombreEmpresa: "",
  correo: "",
  telefono: "",
  err: "",
  success: "",
};
const Cliente = () => {
  const token = useSelector((state) => state.token);
  const clientes = useSelector((state) => state.clientes);

  const [data, setData] = useState(initialState);
  const { nombre, nombreEmpresa, correo, telefono, err, success } = data;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllClientes(token).then((res) => {
      dispatch(dispatchGetAllClientes(res));
    });
  }, [token, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const createCliente = async () => {
    if (!isEmail(correo)) {
      return setData({
        ...data,
        err: "Please enter a valid email address",
        success: "",
      });
    }

    if (!isPhone(telefono)) {
      return setData({
        ...data,
        err: "Please enter a valid phone number",
        success: "",
      });
    }

    try {
      const res = await axios.post(
        "/admin/clientes",
        {
          nombre: nombre,
          nombreEmpresa: nombreEmpresa,
          correo: correo,
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
        await axios.delete(`/admin/clientes/${id}`, {
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
          <h2>Crear Cliente</h2>
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
            <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
            <input
              type="text"
              name="nombreEmpresa"
              id="nombreEmpresa"
              value={nombreEmpresa}
              placeholder="Nombre De la Empresa"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electronico</label>
            <input
              type="text"
              name="correo"
              id="correo"
              value={correo}
              placeholder="Correo Electronico"
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
          <div>
            <em style={{ color: "crimson" }}>
              * If you update your password here you will not be able to login
              quickly with Google or Facebook
            </em>
          </div>
          <button disabled={loading} onClick={createCliente}>
            Crear Cliente
          </button>
        </div>

        <div className="col-right">
          <h2>Clientes Actuales</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Empresa</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente._id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.nombreEmpresa}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.telefono}</td>
                    <td>
                      <Link to={`/cliente-update/${cliente._id}`}>
                        <i className="fas fa-edit" title="Edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash-alt"
                        onClick={() => handleDelete(cliente._id)}
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

export default Cliente;
