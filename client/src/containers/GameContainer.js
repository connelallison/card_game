import React, { Component, Fragment } from "react";
import Hero from "../components/Hero.js";
import OpponentHand from "../components/OpponentHand.js";
import PlayerHand from "../components/PlayerHand.js";
import Deck from "../components/Deck.js";
import BoardHalf from "../components/BoardHalf.js";
// import PubSub from "../helpers/PubSub.js";
import socket from "../helpers/websocket.js";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {
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
        }
      },
      legalMoves: {
        canAttackWith: {},
        canPlay: {}
      }
    };
    const gameContainer = this;
    socket.on("gameStateUpdate", function (data) {
      // console.log(data);
      // console.log(gameContainer);
      gameContainer.setState(data)
    })
  }


  render(){
    let gameStatus;
    if (!this.state.gameState.winner) {
      if (this.state.gameState.myTurn) {
        gameStatus = <p className="gameStatus">It is currently my turn.</p>
      } else {
        gameStatus = <p className="gameStatus">It is currently not my turn.</p>
      }
    } else {
      gameStatus = <p className="gameStatus">The game is over: {this.state.gameState.winner}.</p>
    }

    return (
      <Fragment>
      <Hero attack={this.state.gameState.opponent.attack}
      health={this.state.gameState.opponent.health}
      currentMana={this.state.gameState.opponent.currentMana}
      maxMana={this.state.gameState.opponent.maxMana}
      mine={false}/>
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
      <Hero attack={this.state.gameState.my.attack}
      health={this.state.gameState.my.health}
      currentMana={this.state.gameState.my.currentMana}
      maxMana={this.state.gameState.my.maxMana}
      mine={true}/>
      <br/>
      {gameStatus}
      </Fragment>
    );
  }
}

export default GameContainer;
