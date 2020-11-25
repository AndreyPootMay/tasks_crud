import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/add.task.component";
import Task from "./components/task.component";
import TaskList from "./components/tasks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tasks" className="navbar-brand">
              Firebird - React CRUD
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/tasks"]} component={TaskList} />
              <Route exact path="/add" component={AddTask} />
              <Route path="/tasks/:id" component={Task} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
