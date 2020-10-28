import GameObject from './GameObject'

interface GamePlayerStats {
  rent: number
  fervour: number
  growth: number
  income: number
  minCardCost: number
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
  leader: Leader
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
    this.maxHealth = 35
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
    this.leader = null
    this.leaderTechniqueZone = []
    this.max = {
      hand: 10,
      deck: 50,
      board: 8,
      creationZone: 4,
      passiveZone: 5,
    }
    this.populateBoardSlots()
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
    this.game.event.on('afterEndOfTurn', (event) => this.afterEndOfTurn(event))
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
        text: '',
        // text: {
        //   english: 'Choose a card.'
        // }[localisation],
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
      fatigue: this.fatigueCounter,
    }
  }

  leaderReport() {
    return Object.assign({},
      this.leaderZone[0]?.provideReport() ?? {
        attack: null,
        health: null,
        armour: null,
        currentMoney: null,
        maxMoney: null,
        canBeSelected: false,
        name: '',
        text: '',
        type: 'Leader',
      },
      { maxMoney: this.stats.income, currentMoney: this.money, armour: this.armour })
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

  deckReport(localisation: LocalisationString = 'english'): ObjectReport[] {
    return [...this.deck].map(card => card.provideReport(localisation)).sort((first, second) => this.sortCards(first, second) ? 1 : -1)
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
      })
      this.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
    }
  }

  afterEndOfTurn(event): void {
    if (this.myTurn()) {
      this.modIncome(this.stats.growth)
      this.refillMoney()
      this.payDebt()
      this.payRent()
    }
  }

  controller(): GamePlayer {
    return this
  }

  weapons(): WeaponCreation[] {
    return this.creationZone.filter(creation => creation instanceof WeaponCreation) as WeaponCreation[]
  }

  // opponent(): GamePlayer {
  //   return this.opponentPlayer
  // }

  // effectOwner(): GamePlayer {
  //   return this
  // }

  baseMoney(): number {
    return this.round(this.rawMoney - this.currentDebt)
  }

  baseStats(): GamePlayerStats {
    return {
      growth: this.rawGrowth,
      income: this.rawIncome,
      rent: 0,
      fervour: 0,
      minCardCost: 0,
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
    this.finishUpdate()
  }


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

  populateBoardSlots(): void {
    const board = this.board ?? []
    for (let i = board.length; i < this.max.board; i++) {
      board.push(new BoardSlot(this.game, this, 'board'))
    }
    this.board = board
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
    return this.leaderZone[0]?.health > 0 ?? false
  }

  gainArmour(armour: number): void {
    this.armour += armour
  }

  takeDamage(damage: number, rot?: boolean): number {
    let remainingDamage = damage
    // if (!rot) {
    remainingDamage = damage > this.armour ? this.round(damage - this.armour) : 0
    const remainingArmour = this.armour > damage ? this.round(this.armour - damage) : 0
    this.armour = remainingArmour
    // }
    this.currentHealth = this.round(this.currentHealth - remainingDamage)
    if (rot) this.maxHealth = this.round(this.maxHealth - remainingDamage)
    // this.update()
    return remainingDamage
  }

  receiveHealing(rawHealing: number, nourish?: boolean): number {
    const healing = nourish
      ? rawHealing
      : rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()

    if (nourish) this.maxHealth = this.round(this.maxHealth += healing)
    this.currentHealth = this.round(this.currentHealth += healing)
    return healing
  }

  missingHealth(): number {
    return this.maxHealth - this.currentHealth
  }

  spendMoney(amount: number): void {
    this.rawMoney = this.round(this.rawMoney - amount)
    this.money = this.round(this.money - amount)
  }

  gainMoney(amount: number): void {
    this.rawMoney = this.round(this.rawMoney + amount)
    this.money = this.round(this.money + amount)
  }

  refillMoney(): void {
    const money = this.stats.income - this.rawMoney
    const gainMoneyEvent = new GainMoneyEvent(this.game, {
      player: this,
      money,
      card: this.charOwner(),
    })
    this.game.startNewDeepestPhase('GainMoneyPhase', gainMoneyEvent)
  }

  modIncome(number): void {
    if (this.rawIncome + number >= 0) {
      this.rawIncome = this.round(this.rawIncome + number)
      this.stats.income = this.round(this.stats.income + number)
    } else {
      const diff = this.round(this.stats.income - this.rawIncome)
      this.rawIncome = 0
      this.stats.income = this.round(this.rawIncome + diff)
    }
  }

  modGrowth(number): void {
    if (this.rawGrowth + number >= 0) {
      this.rawGrowth = this.round(this.rawGrowth + number)
      this.stats.growth = this.round(this.stats.growth + number)
    } else {
      const diff = this.round(this.stats.growth - this.rawGrowth)
      this.rawGrowth = 0
      this.stats.growth = this.round(this.rawGrowth + diff)
    }
  }

  accrueDebt(debt: number): void {
    this.queuedDebt = this.round(this.queuedDebt + debt)
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
import WeaponCreation from './WeaponCreation'
import { GainMoneyEvent } from '../gamePhases/GainMoneyPhase'

