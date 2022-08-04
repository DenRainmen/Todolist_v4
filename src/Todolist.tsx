import React, { useState } from "react";

type PROPS = {
  title: string;
  tasks: TaskType[];
  removeTask: (elID: string) => void;
  addTask: (inputText: string) => void;
  changeStatus: (taskId: string, isDone: boolean)=>void
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


  const onChangeCHeckboxHandler =(tId: string, tIsDone: boolean)=>{
    console.log(tId,'want to change')
    props.changeStatus(tId, tIsDone)
  }

  let mapedTasks = filteredTasks.length?
  filteredTasks.map((el) => {
    return (
      <div key={el.id} className={el.isDone?'is-done':''}>
        <button
         onClick={()=>props.removeTask(el.id)}>
           X
           </button>
        <span>{el.title}</span>
        <input
         type="checkbox"
          checked={el.isDone}
          onChange = {()=>onChangeCHeckboxHandler(el.id, el.isDone)}
          />

      </div>
    )
  }):<span>Список задач пуст</span>

  

  let [inputText, setInputText] = useState("")

   // сделаем стэйт для регистрации ошибки ввода текста в поле инпута

  let[error,setError] = useState<string | null>(null)//useState может быть или строкой или null и ничем больше

  const onClickButtonAddTaskHandler = () => {
    
    if (inputText.trim() === "") {
      setInputText("")
      setError('Пустая запись, бро !')
    } else {
      props.addTask(inputText)
      setInputText("")
    }
  }

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value)
    
  };

  const onKeyDownInputHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setError(null)
    if (event.key === "Enter") {
      onClickButtonAddTaskHandler();
    }
  }

 
  // JSX
  return (
    <div>
      <i className="title">{`${props.title} ?`}</i>

      <div className="card-container">
        <div
        style={{paddingLeft: "1vw"}}
        >
          <input
            type="text"
            value={inputText}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownInputHandler}
            className={error?'error':''}
          />
          <button onClick={onClickButtonAddTaskHandler}>+</button>

          {/* текст об ошибке */}
          {error && <div className="error-message">{error}</div>}
        </div>

        {mapedTasks}

        <div>

          <button
           className={btnName==="all"?"active-filter":""}
            onClick={() => ButtonFilterHandler("all")}
            >
              All
            </button>

          <button
           className={btnName==="active"?"active-filter":""}
           onClick={() => ButtonFilterHandler("active")}>
            Active
            </button>

          <button
          className={btnName==="completed"?"active-filter":""}
           onClick={() => ButtonFilterHandler("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
