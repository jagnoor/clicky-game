import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";
import "./App.css";


// Random shuffle
function randomFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
    currentTime: 50,

  };



  setInterval = () => {
    this.interval = setInterval(this.tick, 1000)
  }

  tick = () => {
    if (this.state.currentTime > 0) {
      this.setState({currentTime: this.state.currentTime - 1})
    } else {
      this.handleReset()
    }
  }

  handleReset = () => {
    console.log('handle reset was called!')
    clearInterval(this.interval)

    this.setState({
      currentScore: 0,
      topScore: 0,
      correctIncorrect: "You guessed incorrectly!",
      clicked: [],
      currentTime: 50,
    });
    this.setInterval()
    this.handleShuffle();
  }

  handleClick = id => {
    if (this.state.clicked.length === 0) {
      this.handleReset()
    }
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "You guessed correctly!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 19) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };



  handleShuffle = () => {
    let shuffledFriends = randomFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Memory based clicky Game by Jag "
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
          handleReset={this.handleReset}
          currentTime={this.state.currentTime}

        />

        <Title>
        Click on an image to earn points, but DO NOT click on an same image card repeatedly ! 
        To win click on all images, without clicking on an image twice. 
        
        </Title>
        
        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;
