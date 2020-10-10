import GameObject from './GameObject'

interface GamePlayerStats {
  rent: number
  fervour: number
  growth: number
  income: number
}

class GamePlayer extends GameObject {
  game: Game
  owner: GamePlayer
  zone: 'global'
  name: LocalisedStringObject
  playerName: string
  socketID: string
  maxHealth: number
  currentHealth: number
  armour: number
  rawGrowth: number
  // growth: number
  rawIncome: number
  // income: number
  rawMoney: number
  money: number
  currentDebt: number
  queuedDebt: number
  // rent: number
  // fervour: number
  stats: GamePlayerStats
  leaderZone: Leader[]
  leaderTechniqueZone: LeaderTechnique[]
  board: BoardSlot[]
  hand: Card[]
  deck: Card[]
  creationZone: Creation[]
  passiveZone: Passive[]
  setAsideZone: GameObject[]
  legacy: Card[]
  fatigueCounter: number
  max: {
    hand: number,
    deck: number,
    board: number,
    creationZone: number,
    passiveZone: number
  }
  opponentPlayer: GamePlayer
  bot: boolean
  disconnected: boolean
  conceded: boolean

  constructor(game: Game, name: string, socketID: string = null, bot: boolean = false) {
    super(game, 'Player', { english: 'Player' }, 'Player', 'Player')
    this.owner = this
    this.zone = 'global'
    this.playerName = name
    this.socketID = socketID
    this.maxHealth = 20
    this.currentHealth = this.maxHealth
    this.armour = 0
    this.rawGrowth = 1
    this.rawIncome = 2
    this.rawMoney = this.rawIncome
    this.money = this.rawMoney
    this.stats = this.baseStats()
    this.currentDebt = 0
    this.queuedDebt = 0
    this.leaderZone = []
    this.leaderTechniqueZone = []
    this.max = {
      hand: 10,
      deck: 50,
      board: 8,
      creationZone: 4,
      passiveZone: 5,
    }
    this.board = this.populateBoardSlots()
    this.hand = []
    this.deck = []
    this.creationZone = []
    this.passiveZone = []
    this.setAsideZone = []
    this.legacy = []
    this.fatigueCounter = 0
    this.opponentPlayer
    this.bot
    this.disconnected = false

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    this.game.event.on('endOfTurn', (event) => this.endOfTurn(event))
    this.game.event.on('calculateGlobals', event => this.calculateGlobals())
  }

  boardFollowers(): Follower[] {
    return this.board.filter(slot => !slot.isEmpty()).map(slot => slot.follower)
  }

  validSelectionsReport(localisation: LocalisationString = 'english'): ManualTargetReport {
    if (this.myTurn()) {
      const validSelections = [...this.leaderZone, ...this.leaderTechniqueZone, ...this.hand, ...this.boardFollowers(), ...this.creationZone]
        .filter(card => card.canBeSelected())
      const highlightedSelections = validSelections.filter(card => card.highlighted())
      const validObjectIDs = validSelections.map(card => card.objectID)
      const highlightedObjectIDs = highlightedSelections.map(card => card.objectID)
      return {
        hostile: false,
        text: {
          english: 'Choose a card.'
        }[localisation],
        validTargets: validObjectIDs,
        highlightedTargets: highlightedObjectIDs
      }
    } else return null
  }

  statsReport() {
    return {
      money: this.money,
      debt: this.queuedDebt,
      income: this.stats.income,
      growth: this.stats.growth,
      rent: this.stats.rent,
      fervour: this.stats.fervour,
    }
  }

  leaderReport() {
    return Object.assign({}, this.leaderZone[0].provideReport(), { maxMoney: this.stats.income, currentMoney: this.money, armour: this.armour })
  }

  leaderTechniqueReport() {
    return this.leaderTechniqueZone[0].provideReport()
  }

  boardFollowersReport(): ObjectReport[] {
    return this.boardFollowers().map(follower => follower.provideReport())
  }

  boardReport(): BoardSlotReport[] {
    return this.board.map(slot => slot.provideReport())
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

  deckReport(): ObjectReport[] {
    return [...this.deck].sort((first, second) => first.data.cost - second.data.cost).map(card => card.provideReport())
  }

  legacyReport(): ObjectReport[] {
    return this.legacy.map(card => card.provideReport())
  }

  myTurn(): boolean {
    if (this.game.activeChild !== null) {
      return this.game.activeChild.activePlayer === this
    }
    return false
  }

  startOfTurn(event): void {
    if (this.myTurn()) {
      const proposedDrawEvent = new ProposedDrawEvent(this.game, {
        player: this,
        number: 1,
        criteria: [],
      })
      this.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
    }
  }

  endOfTurn(event): void {
    if (this.myTurn()) {
      this.increaseIncome(this.stats.growth)
      this.refillMoney()
      this.payDebt()
      this.payRent()
    }
  }

  controller(): GamePlayer {
    return this
  }

  // opponent(): GamePlayer {
  //   return this.opponentPlayer
  // }

  // effectOwner(): GamePlayer {
  //   return this
  // }

  baseMoney(): number {
    return this.rawMoney - this.currentDebt
  }

  baseStats(): GamePlayerStats {
    return {
      growth: this.rawGrowth,
      income: this.rawIncome,
      rent: 0,
      fervour: 0,
    }
  }

  baseData(): GameObjectData {
    return {
      money: this.baseMoney(),
      stats: this.baseStats(),
      flags: this.baseFlags(),
    }
  }

  inPlay(): PersistentCard[] {
    return this.game.inPlay.filter(card => card.controller() === this)
  }

  calculateGlobals(): void {
    this.inPlay().forEach(card => {
      if (card.stats.growth) this.stats.growth += card.stats.growth
      if (card.stats.income) this.stats.income += card.stats.income
      if (card.stats.rent) this.stats.rent += card.stats.rent
      if (card.stats.fervour) this.stats.fervour += card.stats.fervour
    })
  }

  update(): void {
    this.staticApply()
    this.auraApply(0)
    this.calculateGlobals()
    this.auraApply(1)
    this.auraApply(2)
    this.auraApply(3)
    this.updateArrays()
  }

  // setData(dataObj) {
  //   Object.assign(this, dataObj)
  // }

  mulliganDraw(): void {
    if (this.deck.length > 0) {
      if (this.hand.length < this.max.hand) {
        const card = this.deck.shift()
        this.hand.push(card)
        card.zone = 'hand'
        card.updateEffects()
      } else {
        const card = this.deck.shift()
        this.legacy.push(card)
        card.zone = 'legacy'
        card.updateEffects()
      }
    } else {
      // throw "overdrew and died"
    }
  }

  populateBoardSlots(): BoardSlot[] {
    const board = []
    for (let i = 0; i < this.max.board; i++) {
      board.push(new BoardSlot(this.game, this, 'board'))
    }
    return board
  }

  firstEmptySlot(): BoardSlot {
    return this.board.find(slot => slot.isEmpty()) || null

  }

  firstEmptySlotIndex(): number {
    return this.board.findIndex(slot => slot.isEmpty())
  }

  filledSlotsCount(): number {
    return this.board.filter(slot => !slot.isEmpty()).length
  }

  emptySlotsCount(): number {
    return this.board.length - this.filledSlotsCount()
  }

  playableCards(): Card[] {
    return this.hand.filter(card => this.canPlay(card))
  }

  canPlay(card: Card): boolean {
    return Permissions.canPlay(this, card)
  }

  canUse(card: TechniqueCreation | LeaderTechnique): boolean {
    return Permissions.canUse(this, card)
  }

  canSummon(card: PersistentCard): boolean {
    return Permissions.canSummon(this, card)
  }

  canSummonType(cardType: PersistentCardTypeString): boolean {
    return Permissions.canSummonType(this, cardType)
  }

  alive(): boolean {
    return this.leaderZone[0].health > 0
  }

  gainArmour(armour: number): void {
    this.armour += armour
  }

  takeDamage(damage: number): number {
    const remainingDamage = damage > this.armour ? damage - this.armour : 0
    const remainingArmour = this.armour > damage ? this.armour - damage : 0
    this.armour = remainingArmour
    this.currentHealth -= remainingDamage
    // this.update()
    return remainingDamage
  }

  spendMoney(amount: number): void {
    this.rawMoney -= amount
    this.money -= amount
  }

  gainMoney(amount: number): void {
    this.rawMoney += amount
    this.money += amount
  }

  refillMoney(): void {
    this.rawMoney = this.stats.income
  }

  increaseIncome(number): void {
    this.rawIncome += number
    this.stats.income += number
  }

  decreaseIncome(number): void {
    if (this.rawIncome - number >= 0) {
      this.rawIncome -= number
    } else {
      this.rawIncome = 0
    }
  }

  accrueDebt(debt: number): void {
    this.queuedDebt += debt
  }

  payDebt(): void {
    this.currentDebt = this.queuedDebt
    this.queuedDebt = 0
  }

  payRent(): void {
    this.inPlay().forEach(card => {
      if (card.stats.rent > 0) {
        const spendMoneyEvent = new SpendMoneyEvent(this.game, {
          player: this,
          money: card.stats.rent,
          card,
        })
        this.game.startNewDeepestPhase('SpendMoneyPhase', spendMoneyEvent)
      }
    })
  }

  reportPlayableCards() {
    return this.playableCards().map((card) => {
      return card.provideReport()
    })
  }
}

export default GamePlayer

import Game from '../gamePhases/Game'
import Leader from './Leader'
import Card, { CardStats } from './Card'
import Follower from './Follower'
import Permissions from '../dictionaries/Permissions'
import LeaderTechnique from './LeaderTechnique'
import BoardSlot from './BoardSlot'
import Creation from './Creation'
import Passive from './Passive'
import { ObjectReport, BoardSlotReport, ManualTargetReport } from '../structs/ObjectReport'
import TechniqueCreation from './TechniqueCreation'
import PersistentCard from './PersistentCard'
import { ProposedDrawEvent } from '../gamePhases/ProposedDrawPhase'
import { LocalisationString, LocalisedStringObject } from '../structs/Localisation'
import GameObjectData from '../structs/GameObjectData'
import { PersistentCardTypeString } from '../stringTypes/ZoneTypeSubtypeString'
import { SpendMoneyEvent } from '../gamePhases/SpendMoneyPhase'

