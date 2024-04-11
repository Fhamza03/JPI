import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import admin from "./Pages/admin";
import user from "./Pages/user";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={admin} />
          <Route exact path="/user" component={user} />
        </Switch>
      </div>
    </Router>
  );
}
