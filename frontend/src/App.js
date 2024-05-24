import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import NewArea from "./Pages/NewArea";
import NewDatabase from "./Pages/NewDatabase";
import NewDepartement from "./Pages/NewDepartement";
import NewFile from "./Pages/NewFile";
import NewProject from "./Pages/NewProject";
import NewSubArea from "./Pages/NewSubArea";
import NewTask from "./Pages/NewTask";
import Signup from "./Pages/Signup";
import UserAreaProject from "./Pages/UserAreaProject";
import adminDashboard from "./Pages/adminDashboard";
import userDashboard from "./Pages/userDashboard";
import userDatabases from "./Pages/userDatabases";
import userFile from "./Pages/userFile";
import ProtectedRoute from "./hooks/ProtectedRoute";
import ExcelPage from "./Pages/ExcelPage";
import WordPage from "./Pages/WordPage";



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
          <ProtectedRoute exact path="/user/UserProject" component={UserAreaProject} role={role} />
          <ProtectedRoute exact path="/user/File" component={userFile} role={role} />
          <ProtectedRoute exact path="/user/WordFile" component={WordPage} role={role} />
          <ProtectedRoute exact path="/user/ExcelFile" component={ExcelPage} role={role} />

        </Switch>
      </div>
    </Router>
  );
}
