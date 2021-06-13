import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";
import Home from "./home/Home";
import Clientes from "./profile/Clientes";
import EditCliente from "./profile/EditCliente";
import Citas from "./profile/Citas";
import EditCita from "./profile/EditCitas";

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />
        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPassword}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPassword}
          exact
        />
        <Route
          path="/profile"
          component={isLogged ? Profile : NotFound}
          exact
        />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />
        <Route
          path="/cliente-update/:id"
          component={isLogged ? EditCliente : Login}
          exact
        />
        <Route
          path="/cita-update/:id"
          component={isLogged ? EditCita : Login}
          exact
        />
        <Route
          path="/adminClientes"
          component={isLogged ? Clientes : Login}
          exact
        />
        <Route path="/adminCitas" component={isLogged ? Citas : Login} exact />
        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
      </Switch>
    </section>
  );
};

export default Body;
