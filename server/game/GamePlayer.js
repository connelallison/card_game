const Card = require("./Card.js");
const Minion = require("./Minion.js");
const Spell = require("./Spell.js");
const { create } = require("./CardLib");

class GamePlayer {
  constructor(deck) {
    this.name = deck.playerName;
    this.health = 30;
    this.maxMana = 2;
    this.currentMana = 2;
    this.hand = [];
    this.maxHand = 7;
    this.deck = deck.shuffle();
    this.board = [];
    this.maxBoard = 5;
    this.graveyard = [];
    this.played = [];
    this.summoned = [];
    this.game;
    this.opponent;
  }

  myTurn(){
    return this.game.activePlayer === this;
  }

  allActive(){
    let allActive = this.hand.concat(this.board)
    allActive = allActive.concat(this.deck);
    return allActive;
  }

  draw(){
    if (this.deck.length > 0) {
      if (this.hand.length < this.maxHand) {
        let card = this.deck.shift();
        this.hand.push(card);
        card.zone = "hand";
        card.onDraw();
      } else {
        this.graveyard.push(this.deck.shift());
      }
    } else {
      this.health = 0;
    }
  }

  mulliganDraw(){
    if (this.deck.length > 0) {
      if (this.hand.length < this.maxHand) {
        let card = this.deck.shift();
        this.hand.push(card);
        card.zone = "hand";
      } else {
        this.graveyard.push(this.deck.shift());
      }
    } else {
      this.health = 0;
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  playableCards(){
    return this.hand.filter(this.canPlay.bind(this));
    // console.log(this.hand.filter(this.canPlay.bind(this)));
  }

  canPlay(card){
    return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana && card.isLegalMove();
  }

  play(card){
    if (this.canPlay(card)) {
      if (card.type === "minion") {
        this.board.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
        this.played.push(card);
        this.summoned.push(card);
        card.zone = "board";
        card.onPlay();
      } else if (card.type === "spell") {
        this.played.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
        card.zone = "graveyard";
        card.onPlay();
      }
    }
  }

  summon(cardName){
    if (this.board.length < this.maxBoard) {
      const card = create(cardName);
      this.board.push(card);
      this.summoned.push(card);
      card.zone = "board";
      card.owner = this;
    }
  }

  alive(){
    return this.health > 0;
  }

  isAttackable(){
    return true;
  }

  gainMaxMana(number){
    let oldMaxMana = this.maxMana;
    if (this.maxMana + number <= 10) {
      this.maxMana += number;
    } else {
      this.maxMana = 10;
    }
    let newMaxMana = this.maxMana;
    return newMaxMana - oldMaxMana;
  }

  loseMaxMana(number){
    let oldMaxMana = this.maxMana;
    if (this.maxMana - number >= 0) {
      this.maxMana -= number;
    } else {
      this.maxMana = 0;
    }
    let newMaxMana = this.maxMana;
    return oldMaxMana - newMaxMana;
  }

}


module.exports = GamePlayer;
