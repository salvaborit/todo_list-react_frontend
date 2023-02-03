import React from "react";
import axios from "axios";

function TaskList({ tasks, completedTasks, taskListReRenderer }) {
  async function handleTaskCompletedChange(event, taskItem) {
    // await axios.delete("http://localhost:8000/api/tasks/${taskItem.id}/");
    await axios
      .put(`http://localhost:8000/api/tasks/${taskItem.id}`, {
        ...taskItem,
        completed: true,
      })
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
    taskListReRenderer(Date.now());
  }

  function renderTaskItem(taskItem) {
    if (!(taskItem instanceof Object) || taskItem === null) {
      throw new TypeError(`Expected an Object but got ${typeof taskItem}`);
    }

    return (
      <li key={taskItem.id}>
        {taskItem.name.slice(0, 50).concat(" ...")}
        <input
          type="checkbox"
          checked={taskItem.completed}
          onChange={(event) => handleTaskCompletedChange(event, taskItem)}
        />
      </li>
    );
  }
  return (
    <div className="TaskList">
      <h2>Pending</h2>
      <ul>
        {tasks.length !== 0 ? (
          tasks.map(renderTaskItem)
        ) : (
          <p>You have no pending tasks.</p>
        )}{" "}
      </ul>
      <h2>Completed</h2>
      <ul>
        {completedTasks.length !== 0 ? (
          completedTasks.map(renderTaskItem)
        ) : (
          <p>You have no completed tasks.</p>
        )}{" "}
      </ul>
    </div>
  );
}

export default TaskList;
