import React from "react";

export default function ItemDropdown(props) {
  
  function changeValue(e) {
    let groupEl = props.groups.find(t => t.groupId === e.target.value)
    props.onChange({type: "change-group", payload: {id: props.itemObj.id, group: groupEl}})
  } 


  
  return (
      <div className="item-container">
        <div className="item-drop">
          <select defaultValue={props.itemObj.group.groupId} id="item-dropdown" className="dropSelect" onChange={(e) => changeValue(e)}>
            {props.groupElements}
          </select>
          <span className="item-arrow"></span>
        </div>
      </div>
    )
}