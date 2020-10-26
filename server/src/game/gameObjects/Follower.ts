import Character, { CharacterData } from './Character'

export interface FollowerData extends CharacterData {
  type: 'Follower'
  subtype: FollowerSubtypeString,
  attack: number
  categories?: FollowerCategoryString[]
}

interface FollowerCategories {
  Barbarian: boolean
  Noble: boolean
  Woman: boolean
  Legend: boolean
  Underclass: boolean
  Tech: boolean
}

abstract class Follower extends Character {
  static readonly data: FollowerData
  readonly data: FollowerData
  maxHealth: number
  zone: FollowerZoneString
  inPlayZone: 'board'
  type: 'Follower'
  subtype: FollowerSubtypeString
  slot: BoardSlot
  categories: FollowerCategories
  validSlots: BoardSlot[]
  summonSickness: boolean

  constructor(game: Game, owner: GamePlayer, data: FollowerData) {
    super(game, owner, data)
    this.rawAttack = data.attack
    this.attack = this.rawAttack
    this.maxHealth = this.rawHealth
    this.inPlayZone = 'board'
    this.slot = null
    this.initCategories(data.categories ?? [])
    this.validSlots = []
    this.summonSickness = false

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  finishUpdate(): void {
    // this.updateActiveOptions()
    // this.updateActiveActions()
    this.updateActiveEvents()
    this.updateActiveDeathEvents()
    this.updateAttackTargets()
    this.updateValidSlots()
    this.attack = this.truncate(this.attack)
    this.health = this.truncate(this.health)
    if (this.cost < this.controller().stats.minCardCost) this.cost = this.controller().stats.minCardCost
    this.cost = this.truncate(this.cost)
    this.healthStatic = this.truncate(this.healthStatic)
  }

  updateAttackTargets(): void {
    this.attackTargets = this.inPlay() ? (this.owner.opponentPlayer.boardFollowers() as Character[]).concat(this.owner.opponentPlayer.leaderZone).filter(defender => {
      return Permissions.canAttack(this, defender)
    }) : []
  }

  updateValidSlots(): void {
    if (this.zone === 'hand') {
      this.validSlots = this.controller().board.filter(slot => slot.isEmpty())
    } else {
      this.validSlots = []
    }
  }

  validSlotsReport(localisation: LocalisationString = 'english'): ManualTargetReport {
    const localisations: LocalisedStringObject = {
      english: 'Choose a slot to put the follower in.'
    }
    return this.validSlots.length > 0 ? {
      hostile: false,
      text: localisations[localisation],
      validTargets: this.validSlots.map(slot => slot.objectID),
      highlightedTargets: [],
    } : null
  }

  slotText(): NameAndTextObject[] {
    return (this.slot && (this.slot.attack !== 0 || this.slot.health !== 0)) ? [this.slot.statsReport()] : []
  }

  initCategories(categories: FollowerCategoryString[]) {
    this.categories = {
      Barbarian: false,
      Legend: false,
      Noble: false,
      Tech: false,
      Underclass: false,
      Woman: false,
    }
    categories.forEach(category => this.categories[category] = true)
  }

  categoriesReport(localisation: LocalisationString = 'english'): string[] {
    const categories = []
    for (const category in this.categories) {
      if (this.categories[category]) categories.push(CategoryIcons[category])
    }
    return categories
  }

  static categoriesReport(data: FollowerData, localisation: LocalisationString = 'english'): string[] {
    return data.categories?.map(category => CategoryIcons[category]) ?? []
  }

  takeDamage(damage: number, rot?: boolean): number {
    let reducedDamage = damage - this.stats.damageReduction >= 0 ? this.round(damage - this.stats.damageReduction) : 0
    if (this.flags.immune && !rot) reducedDamage = 0
    if (reducedDamage > 0 && this.flags.fortune && !rot) {
      reducedDamage = 0
      this.effects = this.effects.filter(effect => !(effect instanceof Fortune))
      this.flags.fortune = false
    }
    this.rawHealth = this.round(this.rawHealth - reducedDamage)
    this.health = this.round(this.health - reducedDamage)
    if (rot) this.maxHealth = this.round(this.maxHealth - reducedDamage)
    this.update()
    return reducedDamage
  }

  receiveHealing(rawHealing: number, nourish?: boolean): number {
    const healing = nourish
      ? rawHealing
      : rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()

    if (nourish) this.maxHealth = this.round(this.maxHealth + healing)
    this.rawHealth = this.round(this.rawHealth + healing)
    this.health = this.round(this.health + healing)
    this.update()
    return healing
  }

  missingHealth(): number {
    return this.maxHealth - this.rawHealth
  }

  hasAttack(): boolean {
    return this.owner.myTurn() && this.ready && this.inPlay() && (!this.summonSickness || this.flags.rush || this.flags.mob)
  }

  getReady(): void {
    this.ready = true
    if (this.inPlay()) {
      this.summonSickness = false
    }
  }

  baseData(): GameObjectData {
    return {
      id: this.data.id,
      name: this.data.name,
      attack: this.rawAttack,
      health: this.rawHealth,
      cost: this.rawCost,
      stats: this.baseStats(),
      flags: this.baseFlags(),
    }
  }

  setData(dataObj: GameObjectData): void {
    if (dataObj.cost < 0) dataObj.cost = 0
    this.healthStatic = this.truncate(dataObj.health)
    Object.assign(this, dataObj)
  }

  applyInherited(): void {
    if (this.inPlay()) {
      this.attack += this.slot.attack
      this.health += this.slot.health
      Object.assign(this.flags, this.slot.flags)
    }
  }

  index(): number {
    if (this.zone === 'board') {
      return this.slot.index()
    }
    return this.controller()[this.zone].indexOf(this)
  }

  leftSlot(): BoardSlot {
    if (this.zone === 'board') {
      const slot = this.controller().board[this.index() - 1]
      return slot !== undefined ? slot : null
    }
    return null
  }

  rightSlot(): BoardSlot {
    if (this.zone === 'board') {
      const slot = this.controller().board[this.index() + 1]
      return slot !== undefined ? slot : null
    }
    return null
  }

  oppositeSlot(): BoardSlot {
    if (this.zone === 'board') {
      const slot = this.opponent().board[this.index()]
      return slot !== undefined ? slot : null
    }
    return null
  }

  adjacentSlots(): BoardSlot[] {
    const adjacentSlots = []
    const leftSlot = this.leftSlot()
    if (leftSlot) adjacentSlots.push(leftSlot)
    const rightSlot = this.rightSlot()
    if (rightSlot) adjacentSlots.push(rightSlot)
    return adjacentSlots
  }

  neighbouringSlots(): BoardSlot[] {
    const neighbouringSlots = this.adjacentSlots()
    const oppositeSlot = this.oppositeSlot()
    if (oppositeSlot) neighbouringSlots.push(oppositeSlot)
    return neighbouringSlots
  }

  leftFollower(): Follower {
    if (this.zone === 'board') {
      return this.leftSlot() && this.leftSlot().follower
    }
    return null
  }

  rightFollower(): Follower {
    if (this.zone === 'board') {
      return this.rightSlot() && this.rightSlot().follower
    }
    return null
  }

  oppositeFollower(): Follower {
    if (this.zone === 'board') {
      return this.oppositeSlot() && this.oppositeSlot().follower
    }
    return null
  }

  adjacentFollowers(): Follower[] {
    const adjacentFollowers = []
    const leftFollower = this.leftFollower()
    if (leftFollower) adjacentFollowers.push(leftFollower)
    const rightFollower = this.rightFollower()
    if (rightFollower) adjacentFollowers.push(rightFollower)
    return adjacentFollowers
  }

  neighbouringFollowers(): Follower[] {
    const neighbouringFollowers = this.adjacentFollowers()
    const oppositeFollower = this.oppositeFollower()
    if (oppositeFollower) neighbouringFollowers.push(oppositeFollower)
    return neighbouringFollowers
  }

  nearestEmptySlot(): BoardSlot {
    if (this.zone !== 'board') return null
    let rightmostSlot = this.rightSlot()
    let leftmostSlot = this.leftSlot()
    const queue: BoardSlot[] = [this.slot]
    while (rightmostSlot || leftmostSlot) {
      if (rightmostSlot) {
        queue.push(rightmostSlot)
        rightmostSlot = rightmostSlot.rightSlot()
      }
      if (leftmostSlot) {
        queue.push(leftmostSlot)
        leftmostSlot = leftmostSlot.leftSlot()
      }
    }
    for (const slot of queue) {
      if (slot.isEmpty()) return slot
    }
    return null
  }
}

export default Follower

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { FollowerSubtypeString, FollowerZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import BoardSlot from './BoardSlot'
import FollowerCategoryString, { CategoryIcons } from '../stringTypes/FollowerCategoryString'
import GameObjectData from '../structs/GameObjectData'
import Permissions from '../dictionaries/Permissions'
import { ManualTargetReport } from '../structs/ObjectReport'
import { LocalisationString, LocalisedNameAndText, LocalisedStringObject, NameAndTextObject } from '../structs/Localisation'
import Effect from './Effect'
import Fortune from '../effects/Fortune'

