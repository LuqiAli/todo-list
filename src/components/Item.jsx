import React from "react";
import ItemDropdown from "./ItemDropdown.jsx";
import { nanoid } from "nanoid";

export default function Item(props) {

    return (
        <div key={nanoid()} style={{display: props.item.show ? "inline" : "none"}}>
            <div className="item" style={{
                                    backgroundColor: props.item.archived ?  "#ef9b9b" : "", 
                                    display: !props.item.archived ? "flex" : props.item.archived && props.showArchived ? "flex" : "none"
                                }}>
                <div className="item-checkbox" onClick={props.click} style={{backgroundColor: props.item.completed ? "#645cff" : ""}}></div>
                <div className="item-title" onClick={props.click} style={{textDecoration: props.item.completed ? "line-through" : ""}}>{props.item.text}</div>
                <ItemDropdown itemObj={props.item} onChange={props.dropdownChange} groups={props.groups} showArchived={props.showArchived}/>
                <div onClick={() => props.xClick(props.item.text, props.item.id)} className="x">X</div>
            </div>
        </div>
    )
}