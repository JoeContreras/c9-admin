import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { isEmail, isPhone } from "../../components/utils/validation/Validation";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledAlert,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
} from "reactstrap";
import axios from "axios";
import Header from "../../components/Headers/Header";
import {
  dispatchGetAllClientes,
  dispatchGetClienteSearch,
  fetchAllClientes,
  fetchClienteSearch,
} from "../../redux/actions/clientesAction";
import DeleteModal from "../Modals/Clientes/DeleteModal";
import EditModal from "../Modals/Clientes/EditModal";
import { useHistory } from "react-router-dom";

const initialState = {
  nombre: "",
  nombreEmpresa: "",
  correo: "",
  telefono: "",
  err: "",
  success: "",
};
const Citas = () => {
  const token = useSelector((state) => state.token);
  const clientes = useSelector((state) => state.clientes);
  const citas = useSelector((state) => state.citas);
  const auth = useSelector((state) => state.auth);

  const history = useHistory();
  const { user } = auth;

  const [data, setData] = useState(initialState);
  const { nombre, nombreEmpresa, correo, telefono, err, success } = data;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [clienteId, setClienteId] = useState("");
  const [modalState, setModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);

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
      setData({
        nombre: "",
        nombreEmpresa: "",
        correo: "",
        telefono: "",
        err: "",
        success: res.data.msg,
      });
      setCallback(!callback);
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  const toggleDeleteModal = () => {
    setModalState(!modalState);
  };

  const renderModal = () => {
    return (
      <DeleteModal
        modalState={modalState}
        toggleModal={toggleDeleteModal}
        id={clienteId}
        setLoading={setLoading}
        setCallback={setCallback}
        setData={setData}
        callback={callback}
        data={data}
        token={token}
      />
    );
  };

  const toggleEditModal = () => {
    setEditModalState(!editModalState);
  };

  const renderEditModal = () => {
    return (
      <EditModal
        modalState={editModalState}
        toggleModal={toggleEditModal}
        id={clienteId}
        setCall={setCallback}
        callback={callback}
        token={token}
      />
    );
  };

  const searchPost = () => {
    if (search.trim()) {
      //  redux search logic
      fetchClienteSearch(token, search).then((res) => {
        dispatch(dispatchGetClienteSearch(res));
      });
      // dispatch(getPostsBySearch({ search}));
      // history.push(`/posts/search?nombre=${search || "none"}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      //  search logic
      searchPost();
    }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div
                    className="card-profile-image"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      alt="avatar"
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      src={user.avatar}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/*
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
*/}
                      <div>
                        <span className="heading">{citas.length}</span>
                        <span className="description">Citas</span>
                      </div>
                      <div>
                        <span className="heading">{clientes.length}</span>
                        <span className="description">Clientes</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user.name}
                    <span className="font-weight-light">, 57</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Durango, Durango
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Desarrollo Web
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Universidad Tecnologica de Durango
                  </div>
                  {/*
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
*/}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Crear nueva Cita</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Informacion de Cliente
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Nombre Completo
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          type="text"
                          name="nombre"
                          value={nombre}
                          placeholder="Nombre Completo"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Nombre De la Empresa
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          type="text"
                          name="nombreEmpresa"
                          value={nombreEmpresa}
                          placeholder="Nombre De la Empresa"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Correo Electronico
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="correo"
                          id="correo"
                          value={correo}
                          placeholder="Correo Electronico"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Telefono
                        </label>
                        <Input
                          type="text"
                          name="telefono"
                          id="telefono"
                          value={telefono}
                          placeholder="Numero de Telefono"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-right">
                        <Button
                          disabled={loading}
                          onClick={createCliente}
                          color="primary"
                          type="submit"
                        >
                          Crear Cliente
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {loading && (
          <UncontrolledAlert className="alert-default" fade={false}>
            <span className="alert-inner--text">
              <strong>Loading...</strong>
            </span>
          </UncontrolledAlert>
        )}
        {/*Alertas de exito y errores*/}
        {err && (
          <UncontrolledAlert color="danger" fade={false}>
            <span className="alert-inner--text">
              <strong>Error! </strong> {err}
            </span>
          </UncontrolledAlert>
        )}
        {success && (
          <UncontrolledAlert color="primary" fade={false}>
            <span className="alert-inner--text">
              <strong>Exito! </strong>El Cliente fue Creado .
            </span>
          </UncontrolledAlert>
        )}
        {renderModal()}
        {renderEditModal()}
        {/*Tabla de usuarios solo para los admin*/}
        {clientes.length > 0 && (
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  {/*<h3 className="text-white mb-0 text-right">Clientes</h3>*/}
                  <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search"
                          type="text"
                          value={search}
                          onKeyDown={handleKeyPress}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Col className="text-right" xs="9">
                      <Button
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setCallback(!callback);
                        }}
                        size="sm"
                      >
                        Todos los Clientes
                      </Button>
                    </Col>
                  </Form>
                </CardHeader>

                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Empresa</th>
                      <th scope="col">Correo Electronico</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente) => (
                      <tr key={cliente._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cliente.nombre}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cliente.nombreEmpresa}
                              </span>
                            </Media>
                          </Media>
                        </td>
                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cliente.correo}
                              </span>
                            </Media>
                          </Media>
                        </td>
                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cliente.telefono}
                              </span>
                            </Media>
                          </Media>
                        </td>
                        <td className="align-items-center">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={(e) => {
                                  setClienteId(cliente._id);
                                  setEditModalState(!editModalState);
                                }}
                              >
                                Editar Cliente
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  setClienteId(cliente._id);
                                  setModalState(!modalState);
                                }}
                              >
                                Borrar Cliente
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <CardFooter
                  style={{ backgroundColor: "#172b4d" }}
                  className="py-4"
                >
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        )}{" "}
      </Container>
    </>
  );
};

export default Citas;
