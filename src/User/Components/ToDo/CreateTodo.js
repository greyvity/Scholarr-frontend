import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      errorMessage: "",
      successMessage: "",
    };
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

  async onSubmit(e) {
    e.preventDefault();
    this.props.setIsLoading(true);

    const newTodo = {
      description: this.state.todo_description,
      responsible: this.state.todo_responsible,
      priority: this.state.todo_priority,
      completed: this.state.todo_completed,
      deadlineDate: e.target.deadline.value,
    };

    const options = {
      headers: {
        "content-type": "application/json",
        "auth-token": this.props.token,
      },
      method: "POST",
      body: JSON.stringify(newTodo),
    };

    const response = await fetch(
      `http://tranquil-woodland-86159.herokuapp.com/api/users/todo/${this.props.user._id}/create_todo`,
      options
    );
    this.props.setIsLoading(false);

    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      this.props.history.push("/todo");
    }

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      errorMessage: jsonResponse.error?.message,
      successMessage: jsonResponse.success?.message,
    });

    setTimeout(() => {
      this.setState({
        errorMessage: "",
        successMessage: "",
      });
    }, 3000);
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
        <h3 className="todo-heading">Create New Todo</h3>

        <form className="create-todo" onSubmit={this.onSubmit}>
          <h2 className="error-message">{this.state.errorMessage}</h2>
          <h2 style={{ color: "green" }}>{this.state.successMessage}</h2>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              placeholder="description"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              placeholder="responsible"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <label>Deadline: </label>
            <input
              type="datetime-local"
              placeholder="responsible"
              className="form-control"
              name="deadline"
            />
          </div>
          <div className="form-group-radio">
            <h3>Priority</h3>
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
              <label htmlFor="priorityLow" className="form-check-label">
                Low
              </label>
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
              <label htmlFor="priorityMedium" className="form-check-label">
                Medium
              </label>
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
              <label htmlFor="priorityHigh" className="form-check-label">
                High
              </label>
            </div>
          </div>
          <div className="form-group">
            <motion.input
              initial={{ filter: "contrast(0.9)" }}
              animate={{ filter: "contrast(1)" }}
              whileHover={{ filter: "contrast(0.9)" }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              value="Create Todo"
              className="button-submit-todo"
            />
          </div>
        </form>
      </motion.div>
    );
  }
}
