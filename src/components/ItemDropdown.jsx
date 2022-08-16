import React from "react";

export default function ItemDropdown(props) {
  
  function changeValue(e) {
    props.onChange({type: "change-group", payload: {id: props.itemObj.id, groups: props.groups, targetValue: e.target.value}})
  } 

  const groupElements =  props.groups.map((t) => (
    <option
      value={t.groupId}
      key={t.groupId}
      style={{
        display: !t.archived
          ? "inline"
          : t.archived && props.showArchived
          ? "inline"
          : "none",
      }}
    >
      {t.groupName}
    </option>
  ));
  
  return (
      <div className="item-container">
        <div className="item-drop">
          <select defaultValue={props.itemObj.group.groupId} id="item-dropdown" className="dropSelect" onChange={(e) => changeValue(e)}>
            {groupElements}
          </select>
          <span className="item-arrow"></span>
        </div>
      </div>
    )
}