import React from "react";

export default function Tab({group, selected, onClick, onDelete, showArchived}) {
    return (
        <div 
            className={
                selected 
                    ? "tab-container tab-selected" 
                    : "tab-container tab-inactive"} 
            onClick={() => onClick(group)}
            style={{
                display: !group.archived 
                    ? "flex" 
                    : group.archived && showArchived 
                    ? "flex" 
                    : "none"
            }}
        > 
            <img className="tab-img" src={group.groupIcon} alt={"group logo"}/>
            <div className="tab-name">{group.groupName}</div>
            {group.groupId !== "All" && <p className="tab-close" onClick={onDelete}>X</p>}
        </div>
    )
}