import React from "react";
import Item from "./components/Item.jsx";
import Navbar from "./components/Navbar.jsx";
import Dropdown from "./components/Dropdown.jsx";
import ArchivePopup from "./components/ArchivePopup.jsx"
import ArchiveButton from "./components/ArchiveButton.jsx"
import {nanoid} from "nanoid";

function todoReducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return { 
        todos: [...state.todos, { text: action.text, completed: false, id: nanoid(), archived: false, show: true}],
        todoCount: parseInt(state.todoCount) + 1
    }
    case "toggle-todo":
      return {
        todos: state.todos.map((t, idx) => idx === action.idx ? {...t, completed: !t.completed} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "delete-todo":
      return {
        todos: state.todos.filter((t) => t.id !== action.payload.id),
        todoCount: parseInt(state.todoCount) - 1
      }
    case "archive-todo":
      return {
        todos: state.todos.map(t => t.id === action.payload.id ? {...t, archived: !t.archived} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "hide-todo":
      return {
        todos: state.todos.map(t => t.id === action.payload.id ? {...t, show: false} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "show-todo":
      return {
        todos: state.todos.map(t => t.id === action.payload.id ? {...t, show: true} : t),
        todoCount: parseInt(state.todoCount)
      }
    default:
      return state
  }
}

function popReducer(state, action) {
  switch (action.type) {
    case "show":
      return {popShow: true, popId: action.payload.popId, popText: action.payload.popText, popArchived: action.payload.archived ? true : false}
    case "hide":
      return {...state, popShow: false}
    default:
      return state
  }
} 

export default function App() {

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", "[]")
    localStorage.setItem("todoCount", "0")
  }
  
  const [{todos, todoCount}, tDispatch] = React.useReducer(todoReducer, { 
    todos: JSON.parse(localStorage.getItem("todos")),
    todoCount: JSON.parse(localStorage.getItem("todoCount"))
  })
  
  const [{popShow, popId, popText, popArchived}, pDispatch] = React.useReducer(popReducer, {
    popShow: false, 
    id: "", 
    popText: "",
    popArchived: false
  })

  const [text, setText] = React.useState("")
  const [showArchived, setShowArchived] = React.useState(false)

  // xClick={() => tDispatch({type: "delete-todo", idx})}
  
  const todoItems = todos.map((t, idx) => 
              <Item 
                title={t.text} 
                click={() => tDispatch({type: "toggle-todo", idx})}
                xClick={() => pDispatch({type: "show", payload: {popId: t.id, popText: t.text, archived: t.archived}})}
                key={t.id}
                show={popShow}
                id={t.id}
                styleTitle={{
                  textDecoration: t.completed ? "line-through" : ""
                }}
                styleBox={{
                  backgroundColor:  t.completed ? "#645cff" : ""
                }}
                styleArchive={{
                  backgroundColor: t.archived ? "#ef9b9b" : "",
                  display: !t.archived ? "flex" : t.archived && showArchived ? "flex" : "none"
                }}
              />)
  
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("todoCount", todos.length)
  }, [todos])
  
  return (
    <div>
      <Navbar />
      
      <div className="full">
        
        <div className="hero">
          <Dropdown />
          <ArchiveButton
            clickHandle={() => setShowArchived((oldArch) => oldArch ? false : true)}
            styleBox={{
              backgroundColor: showArchived ? "#645cff" : ""
            }}/>
        </div>
        
        <form onSubmit={e=> {
          e.preventDefault()
          tDispatch({type: "add-todo", text})
          setText("")
        }}>
          <input placeholder="Enter an item" value={text} onChange={e => setText(e.target.value)}/>
        </form>
        <div className="count">Number of items all together: {todoCount}</div>
        {todoItems}
      </div>
      {popShow && <ArchivePopup 
                  text={popText} 
                  id={popId}
                  archived={popArchived}
                  handleXClick={() => pDispatch({type: "hide"})}
                  handleAClick={() => tDispatch({type: "archive-todo", payload: {id: popId}})}
                  handleDClick={() => tDispatch({type: "delete-todo", payload: {id: popId}})}
                />}
    </div>
  );
}


