// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post(API_URL, { text: newTask }).then(res => {
      setTasks([...tasks, res.data]);
      setNewTask("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text} <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
