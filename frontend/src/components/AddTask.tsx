import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import axios from "axios";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    fetchTasks();

    return () => { newSocket.close(); }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    if (task.trim() !== "" && socket) {
      socket.emit("add", task);
      setTasks((prevTasks) => [...prevTasks, task]);
      setTask("");
    }
  };

  return (
    <div className="note-app">
      <div className="input-container">
        <div className="">
          <h2> Note App...</h2>
          <ul>
            {tasks.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
          <div >
            <input
              type="text"
              placeholder="New Note..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? handleAddTask() : null)}
            />
            <div className="addbtn2">

              <button
                className="AddBtn"
                onClick={handleAddTask}
              >
                <span>+</span>
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
//xnbjd


