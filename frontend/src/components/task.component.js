import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle       = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask             = this.getTask.bind(this);
    this.updatePublished     = this.updatePublished.bind(this);
    this.updateTask          = this.updateTask.bind(this);
    this.deleteTask          = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        ID: null,
        TASK_NAME: "",
        TASK_DESCRIPTION: "",
        ACTIVE: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
    console.log('id ' + this.state.currentTask.ID);
  }

  onChangeTitle(e) {
    const TASK_NAME = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          TASK_NAME: TASK_NAME
        }
      };
    });
  }

  onChangeDescription(e) {
    const TASK_DESCRIPTION = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        TASK_DESCRIPTION: TASK_DESCRIPTION
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    const data = {
      ID: this.state.currentTask.ID,
      TASK_NAME: this.state.currentTask.TASK_NAME,
      TASK_DESCRIPTION: this.state.currentTask.TASK_DESCRIPTION,
      ACTIVE: status
    };

    TaskDataService.update(this.state.currentTask.ID, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            ACTIVE: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
      console.log(this.state.currentTask)
    TaskDataService.update(
      this.state.currentTask.ID,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.ID)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="TASK_NAME">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="TASK_NAME"
                  value={currentTask.TASK_NAME}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="TASK_DESCRIPTION">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="TASK_DESCRIPTION"
                  value={currentTask.TASK_DESCRIPTION}
                  onChange={this.onChangeDescription}
                ></textarea>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.ACTIVE ? "Published" : "Pending"}
              </div>
            </form>

            {currentTask.ACTIVE ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}
