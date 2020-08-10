import GenericLeader from '../cards/GenericLeader'
import Game from '../Game'
import Leader from './Leader'
import Card from './Card'
import Minion from './Minion'
import ObjectReport from '../structs/ObjectReport'

class GamePlayer {
  game: Game
  name: string
  playerID: string
  socketID: string
  health: number
  leader: Leader[]
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
    this.leader = [new GenericLeader(this.game, this, 'leader')]
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

  leaderReport() {
    return Object.assign({}, this.leader[0].provideReport(), { maxMana: this.maxMana, currentMana: this.currentMana })
  }

  boardReport(): ObjectReport[] {
    return this.board.map((minion) => {
      return minion.provideReport()
    })
  }

  handReport(): ObjectReport[] {
    return this.hand.map((card) => {
      return card.provideReport()
    })
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

  playableCards(): Card[] {
    return this.hand.filter(card => this.canPlay(card))
  }

  canPlay(card): boolean {
    return this.game.permissions.canPlay(this, card)
  }
  
  alive(): boolean {
    return this.leader[0].health > 0
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
