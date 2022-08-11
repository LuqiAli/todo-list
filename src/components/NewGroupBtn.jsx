import React from "react";

export default function NewGroup(props) {
    return (
        <div className="new-group-container" onClick={props.onClick}>
            <p><span className="bold">+</span> New Group</p>
        </div>
    )
}