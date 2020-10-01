import React, { Component } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onChangeTodoDeadline = this.onChangeTodoDeadline.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    };
  }
  componentDidMount() {
    const options = {
      headers: {
        "content-type": "application/json",
        "auth-token": this.props.token,
      },
    };
    axios
      .get(
        `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${this.props.location.state.user._id}/detail/${this.props.match.params.todoId}`,
        options
      )
      .then((response) => {
        this.setState({
          todo_description: response.data.success.todo.description,
          todo_responsible: response.data.success.todo.responsible,
          todo_priority: response.data.success.todo.priority,
          todo_completed: response.data.success.todo.completed,
          todo_deadline: response.data.success.todo.deadlineDate,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value,
    });
  }
  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value,
    });
  }
  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value,
    });
  }
  onChangeTodoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed,
    });
  }
  onChangeTodoDeadline(e) {
    this.setState({
      todo_deadline: e.target.value,
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      description: this.state.todo_description,
      responsible: this.state.todo_responsible,
      priority: this.state.todo_priority,
      completed: this.state.todo_completed,
      deadlineDate: this.state.todo_deadline,
    };

    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": this.props.token,
        },
        method: "PATCH",
        body: JSON.stringify(obj),
      };

      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${this.props.location.state.user._id}/update_todo/${this.props.match.params.todoId}`,
        options
      );

      if (response.ok) {
        window.alert("Todo Updated");
        this.props.history.push("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDeleteTodo() {
    try {
      if (window.confirm("Are you sure you want to delete this Todo")) {
        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": this.props.token,
          },
          method: "DELETE",
        };

        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${this.props.location.state.user._id}/delete_todo/${this.props.match.params.todoId}`,
          options
        );

        if (response.ok) {
          window.alert("Todo Deleted");
          this.props.history.push("/todo");
        }
      } else {
        window.alert("Delete Todo Cancelled By User");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "100vw" }}
        className="todo-container"
        style={{ marginTop: 80 }}
      >
        <nav className="todo-nav-container">
          <ul className="todo-nav">
            <motion.li
              animate={{ filter: "contrast(1)" }}
              whileHover={{ filter: "contrast(0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="todo-navbar-item"
            >
              <Link to="/todo" className="todo-nav-link">
                Todo List
              </Link>
            </motion.li>
            <motion.li
              animate={{ filter: "contrast(1)" }}
              whileHover={{ filter: "contrast(0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/todo/create">Create Todo</Link>
            </motion.li>
          </ul>
        </nav>

        <h3 className="todo-heading"> Update Todo</h3>
        <form className="create-todo" onSubmit={this.onSubmit}>
          <h1 className="error-message">{this.state.errorMessage}</h1>
          <h1 style={{ color: "green" }}>{this.state.successMessage}</h1>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <label>Deadline: </label>
            <input
              type="datetime-local"
              className="form-control"
              value={
                this.state.todo_deadline?.split(":")[0] +
                ":" +
                this.state.todo_deadline?.split(":")[1]
              }
              onChange={this.onChangeTodoDeadline}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeTodoCompleted}
                checked={this.state.todo_completed}
                value={this.state.todo_completed}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Update Todo"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
        <button
          className="add-work-submit cancel"
          style={{ width: "10%" }}
          onClick={this.handleDeleteTodo}
        >
          DELETE
        </button>
      </motion.div>
    );
  }
}
