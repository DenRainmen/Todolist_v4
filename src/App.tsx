import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Todolist } from "./Todolist";

export const App = () => {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const removeTask = (elID: string) => {
    tasks = tasks.filter(el => el.id !== elID);
    setTasks(tasks);
    // console.log(tasks);
  };

  const addTask = (inputText: string) => {
    setTasks([...tasks, { id: v1(), title: inputText, isDone: false }]);
  };


  const changeStatus = (taskId: string, isDone: boolean) =>{
    //находим таску , которую нужно менять
   let task = tasks.find(t=>t.id === taskId)
   if(task){
    task.isDone =  !isDone
   }
   
   setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  );
};
