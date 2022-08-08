import React from "react";
import Item from "./Item.jsx";
import Navbar from "./Navbar.jsx";
import Dropdown from "./Dropdown.jsx";
import {nanoid} from "nanoid";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return { 
        todos: [...state.todos, { text: action.text, completed: false, id: nanoid()}],
        todoCount: parseInt(state.todoCount) + 1
    }
    case "toggle-todo":
      return {
        todos: state.todos.map((t, idx) => idx === action.idx ? {...t, completed: !t.completed} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "delete-todo":
      return {
        todos: state.todos.filter((t, idx) => idx !== action.idx),
        todoCount: parseInt(state.todoCount) - 1
      }
    default:
      return state
  }
}

export default function App() {

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", "[]")
    localStorage.setItem("todoCount", "0")
  }
  
  const [{todos, todoCount}, dispatch] = React.useReducer(reducer, { 
    todos: JSON.parse(localStorage.getItem("todos")),
    todoCount: JSON.parse(localStorage.getItem("todoCount"))
  })

  // const [todoCount, setTodoCount] = React.useState()
  const [text, setText] = React.useState("")
  
  const todoItems = todos.map((t, idx) => 
              <Item 
                title={t.text} 
                click={() => dispatch({type: "toggle-todo", idx})}
                xClick={() => dispatch({type: "delete-todo", idx})}
                key={t.id}
                id={t.id}
                styleTitle={{
                  textDecoration: t.completed ? "line-through" : ""
                }}
                styleBox={{
                  backgroundColor:  t.completed ? "#645cff" : ""
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
        
        <Dropdown />
        
        <form onSubmit={e=> {
          e.preventDefault()
          dispatch({type: "add-todo", text})
          setText("")
        }}>
          <input placeholder="Enter an item" value={text} onChange={e => setText(e.target.value)}/>
        </form>
        <div className="count">Number of items on your to-do list: {todoCount}</div>
        {todoItems}
      </div>
    </div>
  );
}


