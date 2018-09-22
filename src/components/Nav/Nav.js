import React from "react";
import "./Nav.css";
import ReactDOM from 'react-dom';


// const Completionist = () => <span>Your time has run out, Better luck next time !</span>;



export default class Nav extends React.Component {
  render() {
    console.log('Nav was rerendered!')
    return (
      <nav>
      <p>Time left: {this.props.currentTime}</p>

      <ul>
        <li className="brand animated lightSpeedIn alignLeft">
          <a href="/clicky-game/">{this.props.title}</a>
          </li>
  
        <li id="rw" >{this.props.correctIncorrect}</li>
  
  
        <li className="alignRight">Score - Top: {this.props.topScore} | Current: {this.props.score}</li>

  
      </ul>
    </nav>
    )
  }
};



