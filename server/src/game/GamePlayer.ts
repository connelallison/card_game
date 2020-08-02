// const Card = require("./Card");
// const Minion = require("./Minion");
// const Spell = require("./Spell");
import GenericHero from './cards/GenericHero'
import { create } from './CardLib'
import Game from './Game'
import Hero from './Hero'
import Card from './Card'
import Minion from './Minion'

class GamePlayer {
  game: Game
  name: string
  playerID: string
  socketID: string
  health: number
  hero: Hero
  maxMana: number
  currentMana: number
  hand: Card[]
  maxHand: number
  deck: Card[]
  fatigueCounter: number
  board: Minion[]
  maxBoard: number
  graveyard: Card[]
  passives: any[]
  opponent: GamePlayer
  bot: boolean

  constructor(game: Game, name: string, socketID: string = null, bot: boolean = false) {
    this.game = game
    this.name = name
    this.playerID = `${this.name}:${Math.random()}`
    this.socketID = socketID
    this.health = 20
    this.hero = new GenericHero(this.game, this)
    this.maxMana = 2
    this.currentMana = 2
    this.hand = []
    this.maxHand = 7
    this.deck = []
    this.fatigueCounter = 0
    this.board = []
    this.maxBoard = 5
    this.graveyard = []
    this.passives = []
    this.opponent
    this.bot

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    this.game.event.on('endOfTurn', (event) => this.endOfTurn(event))
  }

  heroReport() {
    return Object.assign({}, this.hero.provideReport(), { maxMana: this.maxMana, currentMana: this.currentMana })
  }

  boardReport() {
    return this.board.map((minion) => {
      return minion.provideReport()
    })
  }

  handReport() {
    return this.hand.map((card) => {
      return card.provideReport()
    })
  }

  myTurn() {
    return this.game.turn.activePlayer === this
  }

  startOfTurn(event) {
    if (this.myTurn()) {
      this.gainMaxMana(1)
      this.refillMana()
    }
  }

  endOfTurn(event) {
    if (this.myTurn()) {
      this.game.phases.drawPhase({
        player: this
      })
    }
  }

  controller() {
    return this
  }

  mulliganDraw() {
    if (this.deck.length > 0) {
      if (this.hand.length < this.maxHand) {
        const card = this.deck.shift()
        this.hand.push(card)
        card.zone = 'hand'
        card.updateEnchantments()
      } else {
        const card = this.deck.shift()
        this.graveyard.push(card)
        card.zone = 'graveyard'
        card.updateEnchantments()
      }
    } else {
      // throw "overdrew and died"
    }
  }

  playableCards() {
    // console.log("this.hand is: " + this.hand);
    // console.log("this.playableCards() is: " + this.hand.filter(card => this.canPlay(card)));
    return this.hand.filter(card => this.canPlay(card))
    // console.log(this.hand.filter(this.canPlay.bind(this)));
  }

  canPlay(card) {
    // console.log(card);
    // if (card.type === 'minion') {
    //   return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana && this.board.length < this.maxBoard 
    // } else if (card.type === 'spell') {
    //   return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana 
    // } else {
    //   throw new Error(`Card (${card.name}) has ${card.type} for its type.`)
    // }
    return this.game.permissions.canPlay(this, card)
  }

  // play(card) {
  //   // console.log(this.currentMana);
  //   if (this.canPlay(card)) {
  //     this.spendMana(card.cost)
  //     if (card.type === 'minion') {
  //       this.board.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
  //       card.zone = 'board'
  //       card.updateEnchantments()
  //       this.game.inPlay.push(card)
  //       // this.played.push(card)
  //       // this.summoned.push(card)
  //       // card.onPlay()
  //       this.game.announceGameState()
  //     } else if (card.type === 'spell') {
  //       this.graveyard.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
  //       card.zone = 'graveyard'
  //       card.updateEnchantments()
  //       // this.played.push(card)
  //       // card.onPlay()
  //       this.game.announceGameState()
  //     }
  //   }
  // }

  // summon(cardID) {
  //   if (this.board.length < this.maxBoard) {
  //     const card = create(this.game, this, 'board', cardID)
  //     this.board.push(card)
  //     this.game.inPlay.push(card)
  //   }
  // }

  alive() {
    return this.hero.stats.health > 0
  }

  spendMana(amount) {
    this.currentMana -= amount
  }

  refillMana() {
    if (this.currentMana < this.maxMana) {
      this.currentMana = this.maxMana
    }
  }

  gainMaxMana(number) {
    const oldMaxMana = this.maxMana
    if (this.maxMana + number <= 10) {
      this.maxMana += number
    } else {
      this.maxMana = 10
    }
    const newMaxMana = this.maxMana
    return newMaxMana - oldMaxMana
  }

  loseMaxMana(number) {
    const oldMaxMana = this.maxMana
    if (this.maxMana - number >= 0) {
      this.maxMana -= number
    } else {
      this.maxMana = 0
    }
    const newMaxMana = this.maxMana
    return oldMaxMana - newMaxMana
  }

  reportPlayableCards() {
    return this.playableCards().map((card) => {
      return card.provideReport()
    })
  }
}

export default GamePlayer
