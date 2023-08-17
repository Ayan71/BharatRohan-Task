import React from "react";
import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Description for Task 1" },
    { id: 2, title: "Task 2", description: "Description for Task 2" },
    { id: 3, title: "Task 3", description: "Description for Task 3" },
  ]);

  const handleDescriptionChange = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };
  return (
    <div className="app">
      <h1>Task List</h1>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h3>{task.title}</h3>
          <div
            className="description"
            contentEditable
            onBlur={(e) => handleDescriptionChange(task.id, e.target.innerText)}
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
