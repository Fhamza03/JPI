import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import adminDashboard from "./Pages/adminDashboard";
import userDashboard from "./Pages/userDashboard";

export default function App() {
  const role = sessionStorage.getItem("role");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/admin/adminDashboard" component={adminDashboard} role={role}/>
          <ProtectedRoute exact path="/user/userDashboard" component={userDashboard} role={role} />
        </Switch>
      </div>
    </Router>
  );
}
