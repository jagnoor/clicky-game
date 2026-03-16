import React from "react";
import "./Title.css";

const Title = props => (
  <div className="instructions-bar">
    <span className="instructions-icon">&#127912;</span>
    <p className="instructions-text">{props.children}</p>
  </div>
);

export default Title;
