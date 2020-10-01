export const addToDo = async ({
  description,
  responsible,
  token,
  user,
  completed,
  deadlineDate,
  priority,
}) => {
  try {
    const newTodo = {
      description,
      responsible,
      priority,
      completed,
      deadlineDate,
    };

    const options = {
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      method: "POST",
      body: JSON.stringify(newTodo),
    };

    const response = await fetch(
      `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${user._id}/create_todo`,
      options
    );
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      return jsonResponse.success;
    } else {
      return jsonResponse.error;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editToDo = async ({
  description,
  responsible,
  token,
  user,
  completed,
  deadlineDate,
  priority,
  todoId,
}) => {
  try {
    const newTodo = {
      description,
      responsible,
      priority,
      completed,
      deadlineDate,
    };

    const options = {
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      method: "PATCH",
      body: JSON.stringify(newTodo),
    };

    const response = await fetch(
      `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${user._id}/update_todo/${todoId}`,
      options
    );
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      return jsonResponse.success;
    } else {
      return jsonResponse.error;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteToDo = async ({ todoId, token, user }) => {
  try {
    const options = {
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      method: "DELETE",
    };

    const response = await fetch(
      `https://tranquil-woodland-86159.herokuapp.com/api/users/todo/${user._id}/delete_todo/${todoId}`,
      options
    );
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      return jsonResponse.success;
    } else {
      return jsonResponse.error;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
