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
  Container,
  Row,
  Col,
  Badge,
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
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../redux/actions/usersAction";
import axios from "axios";
import {
  isLength,
  isMatch,
} from "../../components/utils/validation/Validation";
import DeleteModal from "../Modals/DeleteModal";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, email, password, cf_password, err, success } = data;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const toggleModal = () => {
    setModalState(!modalState);
  };
  const renderModal = (id) => {
    return (
      <DeleteModal
        modalState={modalState}
        toggleModal={toggleModal}
        id={userId}
        title="Borrar usuario"
        content="Estas seguro que quieres Borrar este Usuario?"
        handleClick={handleDelete}
      />
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        return setData({ ...data, err: "No file was found", success: "" });
      }
      if (file.size > 1024 * 1024) {
        return setData({
          ...data,
          err: "File size exceeds limit",
          success: "",
        });
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return setData({
          ...data,
          err: "File format is not supported",
          success: "",
        });
      }

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
      // setData({ ...data, err: "", success: "Avatar updated" });
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };
  const updateInfo = async () => {
    try {
      const res = await axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData({ ...data, err: "", success: res.data.msg });
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  const updatePassword = async () => {
    if (isLength(password)) {
      return setData({
        ...data,
        err: "Password must be at least 6 characters long",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setData({
        ...data,
        err: "Passwords do not match",
        success: "",
      });
    }
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData({ ...data, err: "", success: res.data.msg });
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (user || avatar) {
      updateInfo();
    }
    if (password) {
      updatePassword();
    }
    setCallback(!callback);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/user/delete/${id}`, {
        headers: { Authorization: token },
      });
      setLoading(false);
      setCallback(!callback);
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {renderModal(1)}
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
                      src={avatar ? avatar : user.avatar}
                    />
                    <input
                      type="file"
                      name="file"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        opacity: "0",
                      }}
                      onChange={updateAvatar}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/*
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
*/}
                  <Button
                    className="float-right"
                    color="default"
                    disabled={loading}
                    onClick={handleUpdate}
                    size="sm"
                  >
                    Actualizar Imagen
                  </Button>
                </div>
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
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
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
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
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
                  User information
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
                          placeholder="Nombre"
                          type="text"
                          nam="name"
                          defaultValue={user.name}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Correo Electronico
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="email"
                          placeholder="jesse@example.com"
                          type="email"
                          defaultValue={user.email}
                          disabled
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
                          Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="password"
                          id="input-first-name"
                          placeholder="Your password"
                          value={password}
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
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-last-name"
                          name="cf_password"
                          placeholder="Confirm Password"
                          value={cf_password}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-right">
                        <Button
                          disabled={loading}
                          onClick={handleUpdate}
                          color="primary"
                          type="submit"
                        >
                          Sign in
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

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
                <span className="alert-inner--icon">
                  <i className="ni ni-like-2" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Exito! </strong> Tu informacion fue actualizada.
                </span>
              </UncontrolledAlert>
            )}

            {/*Tabla de usuarios solo para los admin*/}
            <h2>
              {isAdmin ? (
                <Row className="mt-5">
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Usuarios Activos</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Correo Electronico</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Acciones</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <a
                                    className="avatar rounded-circle mr-3"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <img
                                      alt="..."
                                      src={
                                        require("../../assets/img/theme/bootstrap.jpg")
                                          .default
                                      }
                                    />
                                  </a>
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {user.name}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>{user.email}</td>
                              <td>
                                {user.role === 1 ? <p>Admin</p> : <p>User</p>}
                              </td>
                              <td className="text-right">
                                {/*
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Editar Usuario
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => renderModal(user._id)}
                                    >
                                      Borrar Usuario
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>

*/}

                                <Button
                                  onClick={() => {
                                    console.log(typeof user._id);
                                  }}
                                  color="primary"
                                  type="button"
                                  size="sm"
                                >
                                  Editar
                                </Button>
                                <Button
                                  onClick={() => {
                                    setUserId(user._id);
                                    setModalState(!modalState);
                                  }}
                                  color="danger"
                                  type="button"
                                  size="sm"
                                >
                                  Borrar
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {/*
                      <tr>
                        <td>$2,500 USD</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            pending
                          </Badge>
                        </td>
                        <td className="text-right">
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
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>

                      </tr>
*/}
                        </tbody>
                      </Table>
                      <CardFooter className="py-4">
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
              ) : null}
            </h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
