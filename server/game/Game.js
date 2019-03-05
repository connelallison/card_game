const GamePlayer = require("./GamePlayer.js");
const { create } = require("./CardLib");
const Card = require("./Card.js");
const Minion = require("./Minion.js");
const Spell = require("./Spell.js");
// const { Deck, deck1, deck2 } = require("./Deck.js");
const EventEmitter = require("events");

class Game {
  constructor(player1deck, player2deck, debug=false) {
    Game.games.push(this);
    this.debug = debug;
    this.player1turn = 0;
    this.player2turn = 0;
    this.player1 = new GamePlayer(player1deck);
    this.player2 = new GamePlayer(player2deck);
    this.activePlayer = null;
    this.nextActivePlayer = this.player1;
    this.nextNextActivePlayer = this.player2;
    this.gameOver = false;
    this.turnTimer;
    this.winner;
    this.initPlayers();
    this.mulliganPhase();
    this.start();
    // this.startTurn = this.startTurn.bind(this);
    // this.endTurn = this.endTurn.bind(this);
  }

  allActive(){
    let allActive = this.board().concat(this.hands())
    allActive = allActive.concat(this.decks());
    return allActive;
  }

  graveyard(){
    if (this.activePlayer) {
      return this.activePlayer.graveyard.concat(this.nextActivePlayer.graveyard);
    } else {
      return this.nextActivePlayer.graveyard.concat(this.nextNextActivePlayer.graveyard);
    }
  }

  played(){
    if (this.activePlayer) {
      return this.activePlayer.played.concat(this.nextActivePlayer.played);
    } else {
      return this.nextActivePlayer.played.concat(this.nextNextActivePlayer.played);
    }
  }

  summoned(){
    if (this.activePlayer) {
      return this.activePlayer.summoned.concat(this.nextActivePlayer.summoned);
    } else {
      return this.nextActivePlayer.summoned.concat(this.nextNextActivePlayer.summoned);
    }
  }

  board(){
    if (this.activePlayer) {
      return this.activePlayer.board.concat(this.nextActivePlayer.board);
    } else {
      return this.nextActivePlayer.board.concat(this.nextNextActivePlayer.board);
    }
  }

  hands(){
    if (this.activePlayer) {
      return this.activePlayer.hand.concat(this.nextActivePlayer.hand);
    } else {
      return this.nextActivePlayer.hand.concat(this.nextNextActivePlayer.hand);
    }
  }

  decks(){
    if (this.activePlayer) {
      return this.activePlayer.deck.concat(this.nextActivePlayer.deck);
    } else {
      return this.nextActivePlayer.deck.concat(this.nextNextActivePlayer.deck);
    }
  }



  initPlayers(){
    this.player1.opponent = this.player2;
    this.player2.opponent = this.player1;
    this.player1.game = this;
    this.player2.game = this;
    this.player1.allActive().forEach((card) => { card.owner = this.player1; })
    this.player2.allActive().forEach((card) => { card.owner = this.player2; })
  }

  mulliganPhase(){
    for (let i = 0; i < 5; i++) {
      this.player1.mulliganDraw();
    }
    for (let i = 0; i < 6; i++) {
      this.player2.mulliganDraw();
    }
  }

  start(){
    this.player1.board.push(create("PlayerOneMinion"));
    this.player1.board[0].zone = "board";
    this.player1.board[0].owner = this.player1;
    this.player2.board.push(create("PlayerTwoMinion"));
    this.player2.board[0].zone = "board";
    this.player2.board[0].owner = this.player2;
    // console.log(this);
    this.startTurn();
  }

  startTurn(){
    if (this.nextActivePlayer === this.player1) {
      this.player1turn++;
      if (this.debug) { console.log("Start of turn " + this.player1turn + " for " + this.player1.name); }
    } else {
      this.player2turn++;
      if (this.debug) { console.log("Start of turn " + this.player2turn + " for " + this.player2.name); }
    }
    this.allActive().forEach((card) => {
      card.onAnyTurnStart();
    })
    this.nextActivePlayer.allActive().forEach((card) => {
      card.onMyTurnStart();
    })
    // console.log("\nBefore gaining mana: ");
    // console.log(`Max mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.maxMana}`);
    // console.log(`Current mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.currentMana}`);
    this.nextActivePlayer.gainMaxMana(1);
    this.nextActivePlayer.refillMana();
    // console.log("\nAfter gaining mana: ");
    // console.log(`Max mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.maxMana}`);
    // console.log(`Current mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.currentMana}`);
    this.nextActivePlayer.board.forEach((minion) => {
      minion.readyMinion();
    })
    this.activePlayer = this.nextActivePlayer;
    this.nextActivePlayer = this.nextNextActivePlayer;
    this.nextNextActivePlayer = this.activePlayer;
    this.activePlayer.play(this.activePlayer.playableCards()[0]);
    // console.log(`\n${this.activePlayer.name}'s minions ready to attack: `);
    // console.log(this.activePlayer.minionsReadyToAttack());
    this.activePlayer.minionsReadyToAttack().forEach((minion) => {
      // console.log("Ready minion: ");
      // console.log(minion);
      // console.log("This: ");
      // console.log(this);
      minion.makeAttack(minion.owner.opponent);
    })
    // console.log("\nAfter becoming active: ");
    // console.log(`Max mana of ${this.activePlayer.name}: ${this.activePlayer.maxMana}`);
    // console.log(`Current mana of ${this.activePlayer.name}: ${this.activePlayer.currentMana}`);
    if (!this.gameOver) {
      if (this.debug) { console.log(this.activePlayer.name + " is the active player."); }
      this.turnTimer = setTimeout(this.endTurn.bind(this), 5000);
    }
  }

  endTurn(){
    // console.log(this);
    // if (this.debug) {
    //   console.log(this.activePlayer);
    //   console.log(this.nextActivePlayer);
    //   console.log(this.nextNextActivePlayer);
    // }
    this.turnTimer = null;
    this.activePlayer = null;
    this.nextNextActivePlayer.draw();
    this.nextNextActivePlayer.allActive().forEach((card) => {
      card.onMyTurnEnd();
    });
    if (this.debug) {
      if (this.nextNextActivePlayer === this.player1) {
        console.log("End of turn " + this.player1turn + " for " + this.player1.name);
      } else {
        console.log("End of turn " + this.player2turn + " for " + this.player2.name);
      }
    }
    if (!this.gameOver) {
      this.startTurn();
    }
  }

  resolveCombat(){
    if (!this.gameOver) {

    }
    this.board().forEach((minion) => {
      if (minion.health <= 0) {
        this.graveyard.push(this.board.splice(this.board.indexOf(minion), 1)[0]);
        minion.zone = "graveyard";
        minion.onDeath();
      }
    })
    if (!this.activePlayer) {
      throw new Error("active player is " + this.activePlayer)
    }
    if (!this.activePlayer.alive() || !this.nextActivePlayer.alive()) {
      this.endGame();
    }
  }

  endGame(){
    if (this.turnTimer) {
      clearTimeout(this.turnTimer);
      this.turnTimer = null;
    }
    this.activePlayer = null;
    this.nextActivePlayer = null;
    this.nextNextActivePlayer = null;
    this.gameOver = true;
    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = "player1 wins";
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = "player2 wins";
    } else if (!this.player1.alive() && !this.player2.alive()){
      this.winner = "draw";
    } else {
      throw new Error("endGame() has been called but neither player is dead")
    }
    console.log("The game is over. The result is: " + this.winner);
  }

}

Game.games = [];

module.exports = Game;
