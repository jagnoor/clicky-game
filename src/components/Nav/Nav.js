import React from "react";
import "./Nav.css";

const Nav = (props) => {
  const timeWarning = props.currentTime <= 10 && props.currentTime > 0;
  const progress = (props.score / 19) * 100;

  return (
    <nav className="game-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <h1 className="game-title">Dr. Seuss Clicky</h1>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            <span className="progress-label">{props.score}/19</span>
          </div>
        </div>

        <div className="nav-center">
          {props.correctIncorrect && (
            <div className={`status-badge ${
              props.correctIncorrect.includes("incorrectly") ? "status-wrong" :
              props.correctIncorrect.includes("win") ? "status-win" : "status-correct"
            }`}>
              {props.correctIncorrect.includes("incorrectly") ? "Oops! Try again!" :
               props.correctIncorrect.includes("win") ? "You Win!" : "Great Pick!"}
            </div>
          )}
        </div>

        <div className="nav-right">
          <div className={`timer-display ${timeWarning ? "timer-warning" : ""}`}>
            <span className="timer-icon">&#9201;</span>
            <span className="timer-value">{props.currentTime}s</span>
          </div>
          <div className="score-display">
            <span className="score-label">Best</span>
            <span className="score-value">{props.topScore}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
