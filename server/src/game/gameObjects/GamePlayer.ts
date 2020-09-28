import GameObject from './GameObject'

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
  growth: number
  rawIncome: number
  income: number
  rawMoney: number
  money: number
  currentDebt: number
  queuedDebt: number
  rent: number
  fervour: number
  leaderZone: Leader[]
  leaderTechniqueZone: LeaderTechnique[]
  board: BoardSlot[]
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
    this.growth = this.rawGrowth
    this.rawIncome = 2
    this.income = this.rawIncome
    this.rawMoney = this.income
    this.money = this.rawMoney
    this.currentDebt = 0
    this.queuedDebt = 0
    this.rent = 0
    this.fervour = 0
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
    this.graveyard = []
    this.fatigueCounter = 0
    this.opponent
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
      .map(card => card.objectID)
      
      return {
        hostile: false,
        text: {
          english: 'Choose a card.'
        }[localisation],
        validTargets: validSelections,
      }
    } else return null
  }

  statsReport() {
    return {
      money: this.money,
      income: this.income,
      growth: this.growth,
      debt: this.queuedDebt,
      rent: this.rent,
      fervour: this.fervour,
    }
  }

  leaderReport() {
    return Object.assign({}, this.leaderZone[0].provideReport(), { maxMoney: this.income, currentMoney: this.money, armour: this.armour })
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
      this.increaseIncome(this.growth)
      this.refillMoney()
      this.payDebt()
      this.payRent()
    }
  }

  controller(): GamePlayer {
    return this
  }

  // effectOwner(): GamePlayer {
  //   return this
  // }

  baseMoney(): number {
    return this.rawMoney - this.currentDebt
  }

  baseData(): GameObjectData {
    return {
      growth: this.rawGrowth,
      income: this.rawIncome,
      money: this.baseMoney(),
      debt: 0,
      rent: 0,
      fervour: 0,
      flags: this.baseFlags(),
    }
  }

  inPlay(): PersistentCard[] {
    return this.game.inPlay.filter(card => card.controller() === this)
  }

  calculateGlobals(): void {
    this.inPlay().forEach(card => {
      if (card.growth) this.growth += card.growth
      if (card.income) this.income += card.income
      if (card.rent) this.rent += card.rent
      if (card.fervour) this.fervour += card.fervour
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
    this.rawMoney = this.income
  }

  increaseIncome(number): void {
    this.rawIncome += number
    this.income += number
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
      if (card.rent > 0) {
        const spendMoneyEvent = new SpendMoneyEvent(this.game, {
          player: this,
          money: card.rent,
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
import Card from './Card'
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

