import React from "react";

export default function DeleteGroupPopup(props) {
    return (
        <div className="back-shadow">
            <div className="group-pop">
                <div className="popup-header">
                    <div className="popup-title">What would you like to do?</div>
                    <p className="x-btn" onClick={props.handleCloseWindow}>X</p>
                </div>
                <div className="buttons-group">
                    <div className="btn group-btn" onClick={props.handleArchiveGroup}>Archive Group</div>
                    <div className="btn group-btn" onClick={props.handleDeleteGroup}>Only Delete Group</div>
                    <div className="btn group-btn" onClick={props.handleDeleteAll}>Delete Items + Group</div>
                </div>
            </div>
        </div>
    )
}