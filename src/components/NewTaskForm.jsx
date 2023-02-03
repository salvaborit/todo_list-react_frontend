import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TaskList from "./TaskList";

function NewTaskForm({ tagList, taskListReRenderer }) {
  const [taskName, setTaskName] = useState("");
  const [selectedTagIDs, setSelectedTagIDs] = useState([]);

  async function handleAddTask(e) {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/tasks/", {
      name: taskName,
      tags: selectedTagIDs,
    });
    setTaskName("");
    setSelectedTagIDs([]);
    taskListReRenderer(Date.now());
  }

  function handleTagsChange(e) {
    let tagIDs = [];
    for (let item of e.target.selectedOptions) {
      let tagTitle = item.innerHTML;
      let tagID = tagList.filter((obj) => obj.title === tagTitle);
      tagIDs = [...tagIDs, tagID[0].id];
    }
    setSelectedTagIDs(tagIDs);
  }

  // autofocus text field
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }, []);

  function renderTagOption(tagItem) {
    if (!(tagItem instanceof Object) || tagItem === null) {
      throw new TypeError(`Expected an Object but got ${typeof tagItem}`);
    }
    return <option key={tagItem.id}>{tagItem.title}</option>;
  }

  return (
    <div>
      <form onSubmit={handleAddTask} className="NewTaskForm">
        <div className="nameField">
          <label htmlFor="new-todo-name">Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            ref={inputRef} // autofocus text field
            name="new-todo-name"
            id="new-todo-name"
          />
        </div>
        <div className="tagSelector">
          <label htmlFor="tag-select">Tags</label>
          <select
            size="2"
            name="tag-select"
            id="tag-select"
            onChange={handleTagsChange}
            value={selectedTagIDs.map((id) => {
              return tagList.filter((tag) => id === tag.id)[0].title;
            })}
            multiple
          >
            {tagList.map(renderTagOption)}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewTaskForm;
