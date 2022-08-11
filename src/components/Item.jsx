import React from "react";
import ItemDropdown from "./ItemDropdown.jsx";
import { nanoid } from "nanoid";

export default function Item(props) {

    return (
        <div key={nanoid()} style={props.hideItem}>
            <div className="item" style={props.styleArchive}>
                <div className="item-checkbox" onClick={props.click} style={props.styleBox}></div>
                <div className="item-title" onClick={props.click} style={props.styleTitle}>{props.title}</div>
                <ItemDropdown itemObj={props.itemObject} onChange={props.dropdownChange}groups={props.groups} groupElements={props.groupElements}/>
                <div onClick={() => props.xClick(props.title, props.id)} className="x">X</div>
            </div>
        </div>
    )
}