import React from "react";


export default function ArchivePopup(props) {
    
    return (
        <div className="back-shadow">
            <div className="popup">
                <div className="popup-header">
                    <div className="popup-title">Are you sure you want to delete: {props.text}?</div>
                    <p className="x-btn" onClick={props.handleCloseWindow}>X</p>
                </div>
                <div className="buttons">
                    <div className="btn" onClick={props.handleDelete}>Delete</div>
                    <div className="btn" onClick={props.handleArchive}>{props.archived ? "Unarchive" : "Archive"}</div>
                </div>
            </div>
        </div>
    )
}