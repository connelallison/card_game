class GamePlayer {
  game: Game
  name: string
  playerID: string
  socketID: string
  maxHealth: number
  currentHealth: number
  maxMoney: number
  currentMoney: number
  leaderZone: Leader[]
  leaderTechniqueZone: LeaderTechnique[]
  board: Follower[]
  hand: Card[]
  deck: Card[]
  creationZone: Creation[]
  passiveZone: Passive[]
  setAsideZone: GameObject[]
  graveyard: Card[]
  fatigueCounter: number
  max: {
    hand: number,
    deck: number,
    board: number,
    creationZone: number,
    passiveZone: number
  }
  opponent: GamePlayer
  bot: boolean

  constructor(game: Game, name: string, socketID: string = null, bot: boolean = false) {
    this.game = game
    this.name = name
    this.playerID = `${this.name}:${Math.random()}`
    this.socketID = socketID
    this.maxHealth = 20
    this.currentHealth = this.maxHealth
    this.maxMoney = 2
    this.currentMoney = 2
    this.leaderZone = []
    this.leaderTechniqueZone = []
    this.board = []
    this.hand = []
    this.deck = []
    this.creationZone = []
    this.passiveZone = []
    this.setAsideZone = []
    this.graveyard = []
    this.fatigueCounter = 0
    this.max = {
      hand: 10,
      deck: 50,
      board: 7,
      creationZone: 4,
      passiveZone: 5,
    }
    this.opponent
    this.bot

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    this.game.event.on('endOfTurn', (event) => this.endOfTurn(event))
  }

  leaderReport() {
    return Object.assign({}, this.leaderZone[0].provideReport(), { maxMoney: this.maxMoney, currentMoney: this.currentMoney })
  }

  leaderTechniqueReport() {
    return this.leaderTechniqueZone[0].provideReport()
  }

  boardReport(): ObjectReport[] {
    return this.board.map(unit => unit.provideReport())
  }

  creationsReport(): ObjectReport[] {
    return this.creationZone.map(creation => creation.provideReport())
  }

  passivesReport(): ObjectReport[] {
    return this.passiveZone.map(passive => passive.provideReport())
  }

  handReport(): ObjectReport[] {
    return this.hand.map(card => card.provideReport())
  }

  myTurn(): boolean {
    if (this.game.turn !== null) {
      return this.game.turn.activePlayer === this
    }
    return false
  }

  startOfTurn(event): void {
    if (this.myTurn()) {
      this.gainMaxMoney(1)
      this.refillMoney()
    }
  }

  endOfTurn(event): void {
    if (this.myTurn()) {
      this.game.phases.drawPhase({
        player: this
      })
    }
  }

  controller(): GamePlayer {
    return this
  }

  mulliganDraw(): void {
    if (this.deck.length > 0) {
      if (this.hand.length < this.max.hand) {
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

  playableCards(): Card[] {
    return this.hand.filter(card => this.canPlay(card))
  }

  canPlay(card: Card): boolean {
    return this.game.permissions.canPlay(this, card)
  }

  canUse(card: TechniqueCreation | LeaderTechnique): boolean {
    return this.game.permissions.canUse(this, card)
  }

  canSummon(card: PersistentCard): boolean {
    return this.game.permissions.canSummon(this, card)
  }

  canSummonType(cardType: PersistentCardTypeString): boolean {
    return this.game.permissions.canSummonType(this, cardType)
  }

  alive(): boolean {
    return this.leaderZone[0].health > 0
  }

  spendMoney(amount): void {
    this.currentMoney -= amount
  }

  refillMoney(): void {
    if (this.currentMoney < this.maxMoney) {
      this.currentMoney = this.maxMoney
    }
  }

  gainMaxMoney(number): void {
    this.maxMoney += number
  }

  loseMaxMoney(number): void {
    if (this.maxMoney - number >= 0) {
      this.maxMoney -= number
    } else {
      this.maxMoney = 0
    }
  }

  reportPlayableCards() {
    return this.playableCards().map((card) => {
      return card.provideReport()
    })
  }
}

export default GamePlayer

import Game from '../gameSystems/Game'
import Leader from './Leader'
import Card from './Card'
import Follower from './Follower'
import ObjectReport from '../structs/ObjectReport'
import Creation from './Creation'
import PersistentCard from './PersistentCard'
import GameObject from './GameObject'
import PersistentCardTypeString from '../stringTypes/PersistentCardTypeString'
import TechniqueCreation from './TechniqueCreation'
import LeaderTechnique from './LeaderTechnique'
import Passive from './Passive'

