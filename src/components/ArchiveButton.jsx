import React from "react";

export default function ArchiveButton(props) {
    return (
        <div className="archive-btn">
            <div className="archive-checkbox" onClick={props.clickHandle} style={props.styleBox}></div>
            <div className="archive-title">Show archived</div>
        </div>
    )
}