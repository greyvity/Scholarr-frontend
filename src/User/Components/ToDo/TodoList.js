import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Todo = (props) => (
  <tr>
    {console.log(props.todo.completed)}
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.description}
    </td>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.responsible}
    </td>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.priority}
    </td>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.deadlineDate.split("T")[1].split(":")[0] +
        ":" +
        props.todo.deadlineDate.split("T")[1].split(":")[1] +
        " " +
        " " +
        props.todo.deadlineDate.split("T")[0]}
    </td>
    <td>
      <Link
        to={{
          pathname: "/todo/edit/" + props.todo._id,
          state: { user: props.user },
        }}
      >
        Edit
      </Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
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
        `http://localhost:4000/api/users/todo/${this.props.user._id}/todos/`,
        options
      )
      .then((response) => {
        console.log(response);
        this.setState({ todos: response.data.success.todo });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // componentDidUpdate() {
  //   const options = {
  //     headers: {
  //       "content-type": "application/json",
  //       "auth-token": this.props.token,
  //     },
  //   };

  //   axios
  //     .get(
  //       `http://localhost:4000/api/users/todo/${this.props.user._id}/todos/`,
  //       options
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({ todos: response.data.success.todo });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  todoList(user) {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} key={i} user={user} />;
    });
  }

  render() {
    return (
      <div className="todo-lists">
        <h3 className="todo-heading">List</h3>
        <table className="table table-striped" style={{ marginTop: 5 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.props.user && this.todoList(this.props.user)}</tbody>
        </table>
      </div>
    );
  }
}
