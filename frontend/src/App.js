import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import admin from "./Pages/admin";
import user from "./Pages/user";

export default function App() {
  const role = sessionStorage.getItem("role");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/admin" component={admin} role={role}/>
          <ProtectedRoute exact path="/user" component={user} role={role} />
        </Switch>
      </div>
    </Router>
  );
}
