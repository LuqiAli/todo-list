import React from "react";

export default function Navbar(props) {
    
    return (
        <div className="navbar">
            <p className="navbar-header">To-Do List📋</p>
            <img className="navbar-img" src={props.imgSrc} alt="Group Icon" />
            <p className="navbar-title">{props.title ? props.title : "All items"}</p>
        </div>
    )
}