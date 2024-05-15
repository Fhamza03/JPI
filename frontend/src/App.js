import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import adminDashboard from "./Pages/adminDashboard";
import userDashboard from "./Pages/userDashboard";
import NewProject from "./Pages/NewProject";
import NewDatabase from "./Pages/NewDatabase";
import NewArea from "./Pages/NewArea";
import NewSubArea from "./Pages/NewSubArea";
import NewDepartement from "./Pages/NewDepartement";
import NewTask from "./Pages/NewTask";
import NewFile from "./Pages/NewFile";
import userDatabases from "./Pages/userDatabases";
import userArea from "./Pages/userArea";
import userSubArea from "./Pages/userSubArea";
import userDepartements from "./Pages/userDepartements";
import userTasks from "./Pages/userTasks";
import userFiles from "./Pages/userFiles";
import UserAreaProject from "./Pages/UserAreaProject";
import userFile from "./Pages/userFile";

export default function App() {
  const role = sessionStorage.getItem("role");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/admin/adminDashboard" component={adminDashboard} role={role}/>
          <ProtectedRoute exact path="/admin/NewProject" component={NewProject} role={role} />
          <ProtectedRoute exact path="/admin/NewDatabase" component={NewDatabase} role={role} />
          <ProtectedRoute exact path="/admin/NewArea" component={NewArea} role={role} />
          <ProtectedRoute exact path="/admin/NewSubArea" component={NewSubArea} role={role} />
          <ProtectedRoute exact path="/admin/NewDepartement" component={NewDepartement} role={role} />
          <ProtectedRoute exact path="/admin/NewTask" component={NewTask} role={role} />
          <ProtectedRoute exact path="/admin/NewFile" component={NewFile} role={role} />
          <ProtectedRoute exact path="/user/userDashboard" component={userDashboard} role={role} />
          <ProtectedRoute exact path="/user/Databases" component={userDatabases} role={role} />
          <ProtectedRoute exact path="/user/Areas" component={userArea} role={role} />
          <ProtectedRoute exact path="/user/SubAreas" component={userSubArea} role={role} />
          <ProtectedRoute exact path="/user/Departements" component={userDepartements} role={role} />
          <ProtectedRoute exact path="/user/Tasks" component={userTasks} role={role} />
          <ProtectedRoute exact path="/user/Files" component={userFiles} role={role} />
          <ProtectedRoute exact path="/user/UserProject" component={UserAreaProject} role={role} />
          <ProtectedRoute exact path="/user/File" component={userFile} role={role} />

        </Switch>
      </div>
    </Router>
  );
}
