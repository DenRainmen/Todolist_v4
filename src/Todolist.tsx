import React, { useState } from "react";

type PROPS = {
  title: string;
  tasks: TaskType[];
  removeTask: (elID: string) => void;
  addTask: (inputText: string) => void;
};

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function Todolist(props: PROPS) {
  let [btnName, setFilterName] = useState("");

  const ButtonFilterHandler = (btnName: string) => {
    setFilterName(btnName);
  };

  let filteredTasks;

  switch (btnName) {
    case "active":
      filteredTasks = props.tasks.filter((el) => el.isDone === false);
      break;
    case "completed":
      filteredTasks = props.tasks.filter((el) => el.isDone === true);
      break;
    default:
      filteredTasks = props.tasks;
  }

  let mapedTasks = filteredTasks.length?
  filteredTasks.map((el) => {
    return (
      <div key={el.id}>
        <button
         onClick={()=>props.removeTask(el.id)}>
           X
           </button>
        <span>{el.title}</span>
        <input type="checkbox" checked={el.isDone} />

      </div>
    )
  }):<span>Список задач пуст</span>

  

  let [inputText, setInputText] = useState("");

  const onClickButtonAddTaskHandler = () => {
    if (inputText === "") {
      setInputText("");
    } else {
      props.addTask(inputText);
      setInputText("");
    }
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  const onKeyDownInputHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onClickButtonAddTaskHandler();
    }
  };

  // JSX
  return (
    <div>
      <i className="title">{`${props.title} ?`}</i>

      <div className="card-container">
        <div>
          <input
            type="text"
            value={inputText}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownInputHandler}
          />

          <button onClick={onClickButtonAddTaskHandler}>+</button>
        </div>

        {mapedTasks}

        <div>
          <button onClick={() => ButtonFilterHandler("all")}>All</button>
          <button onClick={() => ButtonFilterHandler("active")}>Active</button>
          <button onClick={() => ButtonFilterHandler("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
