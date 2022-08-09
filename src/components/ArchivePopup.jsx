import React from "react";

export default function ArchivePopup(props) {

    function handleDelete() {
        props.handleDClick()
        props.handleXClick()
    }
    
    function handleArchive() {
        props.handleAClick()
        props.handleXClick()
    }
    
    return (
        <div className="popup">
            <div className="popup-header">
                <div className="popup-title">Are you sure you want to delete: {props.text}?</div>
                <p className="x-btn" onClick={props.handleXClick}>X</p>
            </div>
            <div className="buttons">
                <div className="btn" onClick={handleDelete}>Delete</div>
                <div className="btn" onClick={handleArchive}>{props.archived ? "Unarchive" : "Archive"}</div>
            </div>
        </div>
    )
}