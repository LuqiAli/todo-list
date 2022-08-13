import React from "react";
import Item from "./components/Item.jsx";
import Navbar from "./components/Navbar.jsx";
import Dropdown from "./components/Dropdown.jsx";
import ArchivePopup from "./components/ArchivePopup.jsx"
import ArchiveButton from "./components/ArchiveButton.jsx"
import NewGroup from "./components/NewGroupBtn.jsx"
import CreateGroup from "./components/CreateGroup.jsx"
import allItemsImage from "./images/all-items.jpg"
import DeleteGroupBtn from "./components/DeleteGroupBtn.jsx"
import DeleteGroupPopup from "./components/DeleteGroupPopup.jsx";
import {nanoid} from "nanoid";

const defaultGroup = {groupName: "All items", groupId: "All", groupIcon: allItemsImage, archived: false}

function todoReducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return { 
        todos: [...state.todos, { text: action.payload.text, completed: false, id: nanoid(), archived: false, show: true, group: action.payload.currentGroup}],
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
    case "change-group":
      return {
        todos: state.todos.map(t => t.id === action.payload.id ? {...t, group: action.payload.group} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "hide-group":
      if (action.payload.id === "All") {
        return {
          todos: state.todos.map(t => t.group.archived === true && action.payload.showArchived === false ? {...t, show: false} : {...t, show: true}),
          todoCount: parseInt(state.todoCount)
        }
      } else {
        return {
          todos: state.todos.map(t => t.group.groupId === action.payload.id ? {...t, show: true} : {...t, show: false}),
          todoCount: parseInt(state.todoCount)
        }
      }
    case "default-group":
      return {
        todos: state.todos.map(t => t.group.groupId === action.payload.id ? {...t, group: defaultGroup} : t),
        todoCount: parseInt(state.todoCount)
      }
    case "update-group-archive":
      // console.log(action.payload.currentGroup)
      return {
        todos: state.todos.map(t => t.group.groupId === action.payload.id ? {...t, group: {...t.group, archived: !action.payload.currentGroup.archived}} : t),
        todoCount: parseInt(state.todoCount)
      }
      case "delete-group":
        return {
          todos: state.todos.filter(t => t.group.groupId !== action.payload.id),
          todoCount: parseInt(state.todoCount)
      }
    default:
      return state
  }
}

function archPopReducer(state, action) {
  switch (action.type) {
    case "show":
      return {archPopShow: true, archPopId: action.payload.archPopId, archPopText: action.payload.archPopText, archPopArchived: action.payload.archived ? true : false}
    case "hide":
      return {...state, archPopShow: false}
    default:
      return state
  }
} 

function groupReducer(state, action) {
  switch (action.type) {
    case "add-group":
      return {
        groups: [...state.groups, {groupName: action.payload.name, groupIcon: action.payload.icon, groupId: nanoid(), archived: false}]
      }
    case "delete-group":
      return {
        groups: state.groups.filter(t => t.groupId !== action.payload.id)
      }
    case "archive-group":
      return {
        groups: state.groups.map(t => t.groupId === action.payload.currentGroup.groupId ? {...t, archived: !t.archived} : t)
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
  if (!localStorage.getItem("groups")) {
    localStorage.setItem("groups", JSON.stringify([defaultGroup]))
  }
  
  const [{todos, todoCount}, tDispatch] = React.useReducer(todoReducer, { 
    todos: JSON.parse(localStorage.getItem("todos")),
    todoCount: JSON.parse(localStorage.getItem("todoCount"))
  })
  
  const [{archPopShow, archPopId, archPopText, archPopArchived}, pDispatch] = React.useReducer(archPopReducer, {
    archPopShow: false, 
    archPopId: "", 
    archPopText: "",
    archPopArchived: false
  })

  const [{groups}, groupDispatch] = React.useReducer(groupReducer, {
    groups: JSON.parse(localStorage.getItem("groups"))
  })
  
  const [text, setText] = React.useState("")
  // const [newGroupName, setNewGroupname] = React.useState("")
  const [showArchived, setShowArchived] = React.useState(false)
  const [newGroupShow, setNewGroupShow] = React.useState(false)
  const [archGroupShow, setArchGroupShow] = React.useState(false)
  const [currentGroup, setCurrentGroup] = React.useState(defaultGroup)
 
  // console.log(currentGroup)
  
  const groupElements = groups.map(t => <option
                                          value={t.groupId}
                                          key={t.groupId}
                                          style={{display: !t.archived ? "inline" : t.archived && showArchived ? "inline" : "none"}}
                                        >{t.groupName}</option>)

  const todoItems = todos.map((t, idx) => 
              <Item 
                itemObject={t}
                title={t.text} 
                click={() => tDispatch({type: "toggle-todo", idx})}
                xClick={() => pDispatch({type: "show", payload: {archPopId: t.id, archPopText: t.text, archived: t.archived}})}
                key={t.id}
                show={archPopShow}
                id={t.id}
                styleTitle={{textDecoration: t.completed ? "line-through" : ""}}
                styleBox={{backgroundColor:  t.completed ? "#645cff" : ""}}
                styleArchive={{
                  backgroundColor: t.archived ? "#ef9b9b" : "",
                  display: !t.archived ? "flex" : t.archived && showArchived ? "flex" : "none"
                }}
                hideItem={{display: t.show ? "inline" : "none"}}
                groupElements={groupElements}
                groups={groups}
                dropdownChange={tDispatch}
              />)


  React.useEffect(() => {
    tDispatch({type: "hide-group", payload: {id: currentGroup.groupId, showArchived: showArchived}})
  }, [currentGroup, showArchived])
  
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("todoCount", todos.length)
  }, [todos])

  React.useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups))
  }, [groups])
  
  return (
    <div>
      <Navbar imgSrc={currentGroup.groupIcon} title={currentGroup.groupName}/>
      
      <div className="full">
        
        <div className="hero">
          <Dropdown groups={groupElements} onChange={setCurrentGroup} groupsArr={groups}/>
          <ArchiveButton
            clickHandle={() => setShowArchived((oldArch) => oldArch ? false : true)}
            styleBox={{
              backgroundColor: showArchived ? "#645cff" : ""
            }}/>
          <NewGroup onClick={() => setNewGroupShow(true)}/>
          {currentGroup.groupId !== "All" ? <DeleteGroupBtn onClick={() => {setArchGroupShow(true)}}/> : <></>}
        </div>
        
        <form onSubmit={e=> {
          e.preventDefault()
          tDispatch({type: "add-todo", payload: {text: text, currentGroup: currentGroup}})
          setText("")
        }}>
          <input className="input" placeholder="Enter an item" value={text} onChange={e => setText(e.target.value)}/>
        </form>
        <div className="count">Number of items all together: {todoCount}</div>
        {todoItems}
      </div>
      {archPopShow && <ArchivePopup 
                  text={archPopText} 
                  id={archPopId}
                  archived={archPopArchived}
                  handleCloseWindow={() => pDispatch({type: "hide"})}
                  handleArchive={() => {
                    tDispatch({type: "archive-todo", payload: {id: archPopId}})
                    pDispatch({type: "hide"})
                  }}
                  handleDelete={() => {
                    tDispatch({type: "delete-todo", payload: {id: archPopId}})
                    pDispatch({type: "hide"})
                  }}
                />}
      {newGroupShow && <CreateGroup 
                          handleCloseWindow={() => setNewGroupShow(false)} 
                          handleSubmit={groupDispatch}/>}
      {archGroupShow && <DeleteGroupPopup
                          handleCloseWindow={() => setArchGroupShow(false)}
                          handleDeleteGroup={() => {
                            tDispatch({type: "default-group", payload: {id: currentGroup.groupId}})
                            groupDispatch({type: "delete-group", payload: {id: currentGroup.groupId}})
                            setCurrentGroup(defaultGroup)
                            setArchGroupShow(false)
                          }}
                          handleArchiveGroup={() => {
                            groupDispatch({type: "archive-group", payload: {currentGroup: currentGroup}})
                            setArchGroupShow(false)
                            tDispatch({type: "update-group-archive", payload: {id: currentGroup.groupId, currentGroup: currentGroup}})
                            setCurrentGroup(defaultGroup)
                          }}
                          handleDeleteAll={() => {
                            tDispatch({type: "delete-group", payload: {id: currentGroup.groupId}})
                            groupDispatch({type: "delete-group", payload: {id: currentGroup.groupId}})
                            setCurrentGroup(defaultGroup)
                            setArchGroupShow(false)
                          }}
                        />}
    </div>
  );
}