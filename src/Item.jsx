import React from "react";

export default function Item(props) {

    // const [hover, setHover] = React.useState(false)
    
    // const styles = {
    //     border: hover ? "2px solid rgba(150, 86, 161, 0.9)" : "2px solid rgba(150, 86, 161, 0)",
    //     color: hover ? "rgba(150, 86, 161, 0.9)" : "transparent"
    // }
    
    // onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    // style={styles}

    return (
        <div className="item">
            <div className="item-checkbox" onClick={props.click} style={props.styleBox}></div>
            <div className="item-title" onClick={props.click} style={props.styleTitle}>{props.title}</div>
            <div onClick={props.xClick} className="x">X</div>
        </div>
    )
}