class GamePlayer {
  game: Game
  name: string
  playerID: string
  socketID: string
  health: number
  leaderZone: Leader[]
  leaderAbilityZone: LeaderAbility[]
  maxMana: number
  currentMana: number
  hand: Card[]
  deck: Card[]
  fatigueCounter: number
  board: Unit[]
  graveyard: Card[]
  creationZone: Creation[]
  max: {
    hand: number,
    deck: number,
    board: number,
    creationZone: number,
    passiveZone: number
  }
  passiveZone: any[]
  setAside: GameObject[]
  opponent: GamePlayer
  bot: boolean

  constructor(game: Game, name: string, socketID: string = null, bot: boolean = false) {
    this.game = game
    this.name = name
    this.playerID = `${this.name}:${Math.random()}`
    this.socketID = socketID
    this.health = 20
    this.leaderZone = []
    this.leaderAbilityZone = []
    this.maxMana = 2
    this.currentMana = 2
    this.hand = []
    this.deck = []
    this.fatigueCounter = 0
    this.board = []
    this.graveyard = []
    this.creationZone = []
    this.passiveZone = []
    this.setAside = []
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
    return Object.assign({}, this.leaderZone[0].provideReport(), { maxMana: this.maxMana, currentMana: this.currentMana })
  }

  leaderAbilityReport() {
    return this.leaderAbilityZone[0].provideReport()
  }

  boardReport(): ObjectReport[] {
    return this.board.map(unit => unit.provideReport())
  }

  creationsReport(): ObjectReport[] {
    return this.creationZone.map(creation => creation.provideReport())
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
      this.gainMaxMana(1)
      this.refillMana()
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

  canUse(card: AbilityCreation | LeaderAbility): boolean {
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

  spendMana(amount): void {
    this.currentMana -= amount
  }

  refillMana(): void {
    if (this.currentMana < this.maxMana) {
      this.currentMana = this.maxMana
    }
  }

  gainMaxMana(number): void {
    this.maxMana += number
  }

  loseMaxMana(number): void {
    if (this.maxMana - number >= 0) {
      this.maxMana -= number
    } else {
      this.maxMana = 0
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
import Unit from './Unit'
import ObjectReport from '../structs/ObjectReport'
import Creation from './Creation'
import PersistentCard from './PersistentCard'
import GameObject from './GameObject'
import PersistentCardTypeString from '../stringTypes/PersistentCardTypeString'
import AbilityCreation from './AbilityCreation'
import LeaderAbility from './LeaderAbility'

