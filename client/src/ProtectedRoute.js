import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLayout from "layouts/Admin.js";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLogged ? <AdminLayout {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
