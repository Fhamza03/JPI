import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const role = sessionStorage.getItem("role");
  console.log("Role:", role);
  console.log("Path:", rest.path);

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("Rendering ProtectedRoute...");
        if (role === "ROLE_ADMIN" && rest.path.startsWith("/admin")) {
          console.log("Role is ROLE_ADMIN, rendering component...");
          return <Component {...props} />;
        } else if (role === "ROLE_USER" && rest.path.startsWith("/user")) {
          console.log("Role is ROLE_USER, rendering component...");
          return <Component {...props} />;
        } else {
          console.log("Invalid role or path, redirecting to '/'...");
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
