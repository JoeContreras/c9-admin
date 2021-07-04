import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  dispatchGetAllCitas,
  fetchAllCitas,
} from "../../redux/actions/citaAction";
import { isPhone } from "../../components/utils/validation/Validation";
import ReactDatetime from "react-datetime";
import moment from "moment";
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
  Progress,
  Table,
  UncontrolledTooltip,
  UncontrolledAlert,
} from "reactstrap";
import axios from "axios";
import Header from "../../components/Headers/Header";
import DeleteModal from "../Modals/Citas/DeleteModal";
import EditModal from "../Modals/Citas/EditModal";

const initialState = {
  nombre: "",
  fecha: new Date(),
  lugar: "",
  telefono: "",
  err: "",
  success: "",
};
const Citas = () => {
  const token = useSelector((state) => state.token);
  const clientes = useSelector((state) => state.clientes);
  const citas = useSelector((state) => state.citas);
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const [modalState, setModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [citaId, setCitaId] = useState("");
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

  const handleDate = (date) => {
    // this.setState({date})
    setData({ ...data, fecha: date });
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
          lugar: lugar,
          fecha: fecha,
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

  const toggleDeleteModal = () => {
    setModalState(!modalState);
  };

  const renderModal = () => {
    return (
      <DeleteModal
        modalState={modalState}
        toggleModal={toggleDeleteModal}
        id={citaId}
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

  const renderEditModal = (id) => {
    return (
      <EditModal
        modalState={editModalState}
        toggleModal={toggleEditModal}
        id={citaId}
        setCall={setCallback}
        callback={callback}
      />
    );
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
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
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
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
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
                  Informacion de Cita
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
                          htmlFor="input-username"
                        >
                          Fecha de la Cita
                        </label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <ReactDatetime
                            initialValue={fecha}
                            onChange={handleDate}
                            inputProps={{
                              placeholder: "Fecha de Cita",
                              autoComplete: "off",
                            }}
                            timeFormat={true}
                          />
                        </InputGroup>
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
                          Lugar de la Cita
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="lugar"
                          value={lugar}
                          placeholder="Direccion"
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
                          onClick={createCita}
                          color="primary"
                          type="submit"
                        >
                          Crear Cita
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
              <strong>Exito! La Cita fue Creada</strong> .
            </span>
          </UncontrolledAlert>
        )}
        {renderModal()}
        {renderEditModal()}
        {/*Tabla de usuarios solo para los admin*/}
        {citas.length > 0 && (
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Citas</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Lugar</th>
                      <th scope="col">Telefono</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita) => (
                      <tr key={cita._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cita.nombre}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {moment(cita.fecha).format(
                                  "MMMM Do YYYY, h:mm a"
                                )}
                              </span>
                            </Media>
                          </Media>
                        </td>
                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">{cita.lugar}</span>
                            </Media>
                          </Media>
                        </td>
                        <td>
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {cita.telefono}
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
                                  setCitaId(cita._id);
                                  setEditModalState(!editModalState);
                                }}
                              >
                                Editar Cita
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  setCitaId(cita._id);
                                  setModalState(!modalState);
                                }}
                              >
                                Borrar Cita
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
