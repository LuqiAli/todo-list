import React from "react";

export default function DeleteGroupBtn(props) {
    return (
        <div onClick={props.onClick} className="delete-group-btn">
            <p><span className="bold">-</span>Delete Group</p>
        </div>
    )
}