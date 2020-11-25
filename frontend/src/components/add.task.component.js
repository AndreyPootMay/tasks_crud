import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      ID: null,
      TASK_NAME: "",
      TASK_DESCRIPTION: "",
      PRIORITY: 1,
      ACTIVE: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      TASK_NAME: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      TASK_DESCRIPTION: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      PRIORITY: e.target.value
    });
  }

  saveTask() {
    let data = {
      TASK_NAME: this.state.TASK_NAME,
      TASK_DESCRIPTION: this.state.TASK_DESCRIPTION,
      PRIORITY: this.state.PRIORITY,
      ACTIVE: this.state.ACTIVE,
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          ID: response.data.ID,
          TASK_NAME: response.data.TASK_NAME,
          TASK_DESCRIPTION: response.data.TASK_DESCRIPTION,
          PRIORITY: response.data.PRIORITY,
          ACTIVE: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      ID: null,
      TASK_NAME: "",
      TASK_DESCRIPTION: "",
      PRIORITY: 1,
      ACTIVE: 1
    });
  }

  render() {
    return <div className="submit-form">
    {this.state.ACTIVE ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={this.newTask}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="TASK_NAME">Title</label>
          <input
            type="text"
            className="form-control"
            id="TASK_NAME"
            required
            value={this.state.TASK_NAME}
            onChange={this.onChangeTitle}
            name="TASK_NAME"
          />
        </div>

        <div className="form-group">
          <label htmlFor="TASK_DESCRIPTION">Description</label>
          <input
            type="text"
            className="form-control"
            id="TASK_DESCRIPTION"
            required
            value={this.state.TASK_DESCRIPTION}
            onChange={this.onChangeDescription}
            name="TASK_DESCRIPTION"
          />
        </div>

        <div className="form-group">
          <label htmlFor="PRIORITY">Priority</label>
          <input
            type="number"
            className="form-control"
            id="PRIORITY"
            required
            value={this.state.PRIORITY}
            onChange={this.onChangePriority}
            name="PRIORITY"
          />
        </div>

        <button onClick={this.saveTask} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  }
}
