import React from "react";

export default function Dropdown() {
    return (
        <div className="dropDown">
          <select className="item-select">
            <option value="All">All items</option>
            <option value="Archived">Archived</option>
          </select>
          <span className="custom-arrow"></span>
          <span className="border"></span>
        </div>
    )
}