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
        myTurn: false,
        my: {
          hero: {
            attack: 0,
            health: 0,
            mana: 0
          },
          board: [],
          hand: [],
          deck: 0
        },
        opponent: {
          hero: {
            attack: 0,
            health: 0,
            mana: 0
          },
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
      console.log(data);
      console.log(gameContainer);
      gameContainer.setState(data)
    })
  }

  handleTestButtonClicked(){
    console.log("testButtonClicked");
    socket.emit("updateDisplayName", {
      displayName: "TestName"
    });
  }

  render(){
    // const testButton = <button>Test PubSub</button>;
    // testButton.addEventListener('click', (event) => {
    //   PubSub.publish("GameContainer:TestButtonClicked");
    // })
    return (
      <Fragment>
      <button onClick={this.handleTestButtonClicked}>Test PubSub</button>
      <Hero attack={this.state.gameState.opponent.hero.attack}
            health={this.state.gameState.opponent.hero.health}
            mana={this.state.gameState.opponent.hero.mana}
            mine={false}/>
      <OpponentHand cardNumber={this.state.gameState.opponent.hand}/>
      <Deck mine={false} cardNumber={this.state.gameState.opponent.deck}/>
      <BoardHalf mine={false} minions={this.state.gameState.opponent.board}/>
      <BoardHalf mine={true} minions={this.state.gameState.my.board}/>
      <Deck mine={false} cardNumber={this.state.gameState.opponent.deck}/>
      <PlayerHand cards={this.state.gameState.my.hand}/>
      <Hero attack={this.state.gameState.my.hero.attack}
            health={this.state.gameState.my.hero.health}
            mana={this.state.gameState.my.hero.mana}
            mine={true}/>
      </Fragment>
    );
  }
}

export default GameContainer;
