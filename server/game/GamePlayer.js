// const Card = require("./Card.js");
// const Minion = require("./Minion.js");
// const Spell = require("./Spell.js");
const { create } = require('./CardLib')

class GamePlayer {
  constructor (name, socketID = null) {
    this.name = name
    this.socketID = socketID
    this.attack = 0
    this.health = 20
    this.maxMana = 2
    this.currentMana = 2
    this.hand = []
    this.maxHand = 7
    this.deck = []
    this.board = []
    this.maxBoard = 5
    this.graveyard = []
    this.played = []
    this.summoned = []
    this.game
    this.opponent
    this.bot
  }

  boardReport () {
    return this.board.map((minion) => {
      return minion.provideReport()
    })
  }

  handReport () {
    return this.hand.map((card) => {
      return card.provideReport()
    })
  }

  myTurn () {
    return this.game.activePlayer === this
  }

  allActive () {
    let allActive = this.hand.concat(this.board)
    allActive = allActive.concat(this.deck)
    return allActive
  }

  takeDamage (damage) {
    if (damage > 0) {
      this.health -= damage
      console.log(`${this.name} takes ${damage} damage`)
      console.log(`${this.name} now has ${this.health} health`)
      // this.afterTakingDamage();
    }
  }

  draw () {
    if (this.deck.length > 0) {
      if (this.hand.length < this.maxHand) {
        const card = this.deck.shift()
        this.hand.push(card)
        card.zone = 'hand'
        card.onDraw()
      } else {
        this.graveyard.push(this.deck.shift())
      }
    } else {
      this.health = 0
      this.game.resolveDamage()
      // throw "overdrew and died"
    }
  }

  mulliganDraw () {
    if (this.deck.length > 0) {
      if (this.hand.length < this.maxHand) {
        const card = this.deck.shift()
        this.hand.push(card)
        card.zone = 'hand'
      } else {
        this.graveyard.push(this.deck.shift())
      }
    } else {
      this.health = 0
      this.game.resolveDamage()
      // throw "overdrew and died"
    }
  }

  shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  playableCards () {
    // console.log("this.hand is: " + this.hand);
    // console.log("this.playableCards() is: " + this.hand.filter(card => this.canPlay(card)));
    return this.hand.filter(card => this.canPlay(card))
    // console.log(this.hand.filter(this.canPlay.bind(this)));
  }

  canPlay (card) {
    // console.log(card);
    if (card.type === 'minion') {
      return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana && this.board.length < this.maxBoard && card.isLegalMove()
    } else if (card.type === 'spell') {
      return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana && card.isLegalMove()
    } else {
      throw new Error(`Card (${card.name}) has ${card.type} for its type.`)
    }
  }

  play (card) {
    // console.log(this.currentMana);
    if (this.canPlay(card)) {
      this.spendMana(card.cost)
      if (card.type === 'minion') {
        this.board.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
        this.played.push(card)
        this.summoned.push(card)
        card.zone = 'board'
        card.onPlay()
        this.game.announceGameState()
      } else if (card.type === 'spell') {
        this.played.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
        card.zone = 'graveyard'
        card.onPlay()
        this.game.announceGameState()
      }
    }
  }

  summon (cardID) {
    if (this.board.length < this.maxBoard) {
      const card = create(cardID)
      card.owner = this
      this.board.push(card)
      this.summoned.push(card)
      card.zone = 'board'
      card.afterThisSummoned()
    }
  }

  alive () {
    return this.health > 0
  }

  isAttackable () {
    return true
  }

  spendMana (amount) {
    this.currentMana -= amount
  }

  refillMana () {
    if (this.currentMana < this.maxMana) {
      this.currentMana = this.maxMana
    }
  }

  gainMaxMana (number) {
    const oldMaxMana = this.maxMana
    if (this.maxMana + number <= 10) {
      this.maxMana += number
    } else {
      this.maxMana = 10
    }
    const newMaxMana = this.maxMana
    return newMaxMana - oldMaxMana
  }

  loseMaxMana (number) {
    const oldMaxMana = this.maxMana
    if (this.maxMana - number >= 0) {
      this.maxMana -= number
    } else {
      this.maxMana = 0
    }
    const newMaxMana = this.maxMana
    return oldMaxMana - newMaxMana
  }

  minionsReadyToAttack () {
    return this.board.filter(minion => minion.canAttack())
  }

  reportMinionsReadyToAttack () {
    return this.minionsReadyToAttack().map((minion) => {
      return minion.provideReport()
    })
  }

  reportPlayableCards () {
    return this.playableCards().map((card) => {
      return card.provideReport()
    })
  }
}

module.exports = GamePlayer
