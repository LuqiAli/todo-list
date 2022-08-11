import React from "react";

export default function Dropdown(props) {
  
  function changeValue(e) {
    let groupEl = props.groupsArr.find(t => t.groupId === e.target.value)
    // console.log(groupEl)
    props.onChange(groupEl)
  }
  
  return (
      <div className="drop-container">
        <div className="dropDown">
          <select id="main-dropdown" className="item-select" onChange={(e) => changeValue(e)}>
            {/* <option value="All">All items</option> */}
            {props.groups}
          </select>
          <span className="custom-arrow"></span>
        </div>
      </div>
    )
}