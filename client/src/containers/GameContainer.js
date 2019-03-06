import React, { Component, Fragment } from "react";
import Hero from "../components/Hero.js";
import OpponentHand from "../components/OpponentHand.js";
import PlayerHand from "../components/PlayerHand.js";
import Deck from "../components/Deck.js";
import BoardHalf from "../components/BoardHalf.js";
import TurnTimer from "../components/TurnTimer.js";
import TestGameButton from "../components/TestGameButton.js";
import DisplayName from "../components/DisplayName.js";
// import PubSub from "../helpers/PubSub.js";
import socket from "../helpers/websocket.js";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {
        started: null,
        winner: null,
        myTurn: false,
        my: {
          attack: 0,
          health: 0,
          currentMana: 0,
          maxMana: 0,
          board: [],
          hand: [],
          deck: 0
        },
        opponent: {
          attack: 0,
          health: 0,
          currentMana: 0,
          maxMana: 0,
          board: [],
          hand: 0,
          deck: 0
        },
        legalMoves: {
          canAttackWith: {},
          canPlay: {}
        }
      },
      turnTimer: 0,
      requestTestGameButtonEnabled: true
    };
    this.timerID = setInterval(
      () => this.tick(),
      10
    );
    this.handleRequestTestGame = this.handleRequestTestGame.bind(this);

    const gameContainer = this;
    socket.on("gameStateUpdate", function (gameState) {
      // console.log(gameState);
      // console.log(gameContainer);
      gameContainer.setState({gameState: gameState});
      if (gameContainer.state.gameState.started && !gameContainer.state.gameState.winner) {
        gameContainer.setState({requestTestGameButtonEnabled: false})
      } else {
        gameContainer.setState({requestTestGameButtonEnabled: true})
      }
    });
    socket.on("turnTimerUpdate", function (turnTimer) {
      gameContainer.setState({turnTimer: turnTimer});
    })
  }

  handleUpdateDisplayName(displayName){
    socket.emit("updateDisplayName", {
      displayName: displayName
    });
    localStorage.setItem("displayName", displayName);
  }

  handleRequestTestGame(){
    if (this.state.requestTestGameButtonEnabled) {
      console.log("requesting test game");
      socket.emit("requestTestGame");
    } else {
      console.log("test game button disabled");
    }
  }


  tick() {
    this.setState({
      turnTimer: (this.state.turnTimer - 10)
    });
  }

  render(){
    let gameStatus;
    let turnTimer;
    let currentName;
    if (!this.state.gameState.winner && this.state.gameState.started) {
      if (this.state.gameState.myTurn) {
        gameStatus = <p className="lowerMargin">It is currently my turn.</p>
      } else {
        gameStatus = <p className="lowerMargin">It is currently my opponent's turn.</p>
      }
      turnTimer = <TurnTimer mine={this.state.gameState.myTurn} turnEnd={this.state.turnTimer}/>
    } else if (this.state.gameState.winner) {
      gameStatus = <p className="lowerMargin">The game is over: {this.state.gameState.winner}.</p>
      turnTimer = null;
    } else {
      gameStatus = <p className="lowerMargin">The game has not started yet.</p>
      turnTimer = null;
    }
    if (localStorage.getItem("displayName")) {
      currentName = localStorage.getItem("displayName");
    } else {
      currentName = "Anonymous";
    }
    // console.log(currentName);

    return (
      <Fragment>
      <div className="topBar">
      <DisplayName currentName={currentName} handleSubmit={this.handleUpdateDisplayName}/>
      <TestGameButton onRequested={this.handleRequestTestGame}/>
      </div>
      <div className="heroDiv">
      <Hero attack={this.state.gameState.opponent.attack}
      health={this.state.gameState.opponent.health}
      currentMana={this.state.gameState.opponent.currentMana}
      maxMana={this.state.gameState.opponent.maxMana}
      mine={false}/>
      </div>
      <br/>
      <OpponentHand cardNumber={this.state.gameState.opponent.hand}/>
      <br/>
      <Deck mine={false} cardNumber={this.state.gameState.opponent.deck}/>
      <br/>
      <BoardHalf mine={false} minions={this.state.gameState.opponent.board}/>
      <br/>
      <BoardHalf mine={true} minions={this.state.gameState.my.board}/>
      <br/>
      <Deck mine={true} cardNumber={this.state.gameState.my.deck}/>
      <br/>
      <PlayerHand cards={this.state.gameState.my.hand}/>
      <br/>
      <div className="heroDiv">
      <Hero attack={this.state.gameState.my.attack}
      health={this.state.gameState.my.health}
      currentMana={this.state.gameState.my.currentMana}
      maxMana={this.state.gameState.my.maxMana}
      mine={true}/>
      </div>
      <br/>
      {gameStatus}
      {turnTimer}
      </Fragment>
    );
  }
}

export default GameContainer;
