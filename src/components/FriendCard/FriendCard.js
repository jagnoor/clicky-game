import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div
    className="card-wrapper"
    onClick={() => props.handleClick(props.id)}
    role="button"
    tabIndex={0}
    aria-label={`Character card ${props.id}`}
  >
    <div className="card-inner">
      <div className="card-glow" />
      <div className="card-image-container">
        <img
          alt={`Dr. Seuss character ${props.id}`}
          src={props.image}
          draggable="false"
        />
      </div>
      <div className="card-shine" />
    </div>
  </div>
);

export default FriendCard;
