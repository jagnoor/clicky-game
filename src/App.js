import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

function shuffleArray(array) {
  var shuffled = array.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

function createConfetti() {
  var colors = ['#FF6B6B', '#4A90D9', '#66BB6A', '#FFA726', '#AB47BC', '#29B6F6', '#FF7043'];
  var pieces = [];
  for (var i = 0; i < 40; i++) {
    pieces.push({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 10,
      rotation: Math.random() * 360,
    });
  }
  return pieces;
}

class App extends Component {
  state = {
    friends: shuffleArray(friends),
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
    currentTime: 30,
    timerStarted: false,
    gameWon: false,
    confetti: [],
    shaking: false,
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({ timerStarted: true, currentTime: 30 });
    this.interval = setInterval(this.tick, 1000);
  };

  tick = () => {
    if (this.state.currentTime > 1) {
      this.setState({ currentTime: this.state.currentTime - 1 });
    } else {
      this.handleTimeUp();
    }
  };

  handleTimeUp = () => {
    clearInterval(this.interval);
    this.setState({
      currentScore: 0,
      correctIncorrect: "You guessed incorrectly!",
      clicked: [],
      currentTime: 30,
      timerStarted: false,
      shaking: true,
      friends: shuffleArray(friends),
    });
    setTimeout(function () {
      this.setState({ shaking: false });
    }.bind(this), 500);
  };

  handleClick = function (id) {
    // Start timer on first click of a new game
    if (!this.state.timerStarted) {
      this.startTimer();
    }

    if (this.state.clicked.indexOf(id) === -1) {
      // New card - correct guess
      var newScore = this.state.currentScore + 1;
      var newClicked = this.state.clicked.concat(id);

      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }

      if (newScore === 19) {
        // WIN!
        clearInterval(this.interval);
        this.setState({
          currentScore: newScore,
          correctIncorrect: "You win!",
          clicked: newClicked,
          gameWon: true,
          confetti: createConfetti(),
          timerStarted: false,
        });
      } else {
        this.setState({
          currentScore: newScore,
          correctIncorrect: "You guessed correctly!",
          clicked: newClicked,
          friends: shuffleArray(friends),
        });
      }
    } else {
      // Already clicked - wrong guess
      clearInterval(this.interval);
      this.setState({
        currentScore: 0,
        correctIncorrect: "You guessed incorrectly!",
        clicked: [],
        currentTime: 30,
        timerStarted: false,
        shaking: true,
        friends: shuffleArray(friends),
      });
      setTimeout(function () {
        this.setState({ shaking: false });
      }.bind(this), 500);
    }
  }.bind(this);

  handlePlayAgain = function () {
    this.setState({
      friends: shuffleArray(friends),
      currentScore: 0,
      correctIncorrect: "",
      clicked: [],
      currentTime: 30,
      timerStarted: false,
      gameWon: false,
      confetti: [],
    });
  }.bind(this);

  render() {
    return (
      <Wrapper>
        <Nav
          title="Dr. Seuss Clicky"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
          currentTime={this.state.currentTime}
        />

        <div className="cards-area">
          <div style={{ padding: '8px 0 12px' }}>
            <Title>
              Tap each character once to score! Cards shuffle after every tap. Don't pick the same one twice!
            </Title>
          </div>

          <div className={this.state.shaking ? "cards-grid game-shake" : "cards-grid"}>
            {this.state.friends.map(function (friend) {
              return (
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  id={friend.id}
                  image={friend.image}
                />
              );
            }.bind(this))}
          </div>
        </div>

        {this.state.gameWon && (
          <div className="win-overlay" onClick={this.handlePlayAgain}>
            {this.state.confetti.map(function (piece) {
              return (
                <div
                  key={piece.id}
                  className="confetti"
                  style={{
                    left: piece.left + '%',
                    backgroundColor: piece.color,
                    width: piece.size + 'px',
                    height: piece.size + 'px',
                    animationDelay: piece.delay + 's',
                    animationDuration: piece.duration + 's',
                    transform: 'rotate(' + piece.rotation + 'deg)',
                  }}
                />
              );
            })}
            <div className="win-modal" onClick={function (e) { e.stopPropagation(); }}>
              <h2>You Win!</h2>
              <p>Amazing! You matched all 19 characters!</p>
              <button onClick={this.handlePlayAgain}>Play Again</button>
            </div>
          </div>
        )}
      </Wrapper>
    );
  }
}

export default App;
