import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  // store tasks/tags to be rendered in the main screen
  const [taskList, setTaskList] = useState([]);
  const [tagList, setTagList] = useState([]);
  // fetch all tasks/tags on first render
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((resp) => setTaskList(resp.data));
    axios
      .get("http://localhost:8000/api/tags/")
      .then((resp) => setTagList(resp.data));
  }, []);

  // on change of this variable, taskList is re-rendered
  const [addTaskHandler, setAddTaskHandler] = useState("");
  // func to be passed down as prop to child components
  // to be called whenever TaskList needs to be re rendered
  function handleAddTask(newValue) {
    setAddTaskHandler(newValue);
  }
  // update taskList on task creation
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((resp) => setTaskList(resp.data));
  }, [addTaskHandler]);

  return (
    <div className="App">
      <NewTaskForm
        tagList={tagList.sort()}
        taskListReRenderer={handleAddTask}
      />
      <TaskList
        tasks={taskList
          .filter((taskItem) => taskItem.completed === false)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))}
        completedTasks={taskList
          .filter((taskItem) => taskItem.completed === true)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))}
        taskListReRenderer={handleAddTask}
      />
    </div>
  );
}

export default App;
