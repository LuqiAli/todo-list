import React from "react";
import Tab from "./Tab.jsx";

export default function Tabs(props) {

    const tabElements = props.groups.map(t => <Tab 
                                            group={t}
                                            selected={props.currentGroup.groupId === t.groupId ? true : false} 
                                            key={t.groupId}
                                            onClick={props.onClick}
                                            onDelete={props.onDelete}
                                            showArchived={props.showArchived}
                                            />)      
    
    return (
        <div className="tabs-container">
            <div className="tabs-add" onClick={props.onAdd}>+</div>
            {tabElements}
        </div>
    )
}