import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
import AdminLayout from "layouts/Admin.js";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("firstLogin");
  /*
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
*/

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <AdminLayout {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;