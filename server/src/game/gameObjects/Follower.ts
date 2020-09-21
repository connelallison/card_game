import Character, { CharacterData } from './Character'

export interface FollowerData extends CharacterData {
  type: 'Follower'
  subtype: FollowerSubtypeString,
  categories: FollowerCategoryString[]
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
  categories: FollowerCategoryString[]
  validSlots: BoardSlot[]
  summonSickness: boolean

  constructor(game: Game, owner: GamePlayer, data: FollowerData) {
    super(game, owner, data)
    this.maxHealth = this.rawHealth
    this.inPlayZone = 'board'
    this.slot = null
    this.categories = data.categories
    this.validSlots = []
    this.summonSickness = false

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  updateArrays(): void {
    // this.updateActiveOptions()
    // this.updateActiveActions()
    this.updateActiveEvents()
    this.updateActiveDeathEvents()
    this.updateAttackTargets()
    this.updateValidSlots()
  }

  updateAttackTargets(): void {
    this.attackTargets = this.inPlay() ? (this.owner.opponent.leaderZone as Character[]).concat(this.owner.opponent.boardFollowers()).filter(defender => {
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
    } : null
  }


  
  takeDamage(damage: number): number {
    this.rawHealth -= damage
    this.health -= damage
    this.update()
    return damage
  }

  receiveHealing(rawHealing: number): number {
    const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
    this.rawHealth += healing
    this.health += healing
    this.update()
    return healing
  }

  missingHealth(): number {
    return this.maxHealth - this.rawHealth
  }

  getReady(): void {
    if (this.inPlay()) {
      this.ready = true
      this.summonSickness = false
    } else {
      throw new Error(`getReady() is being called on a character (${this.name}) while not in play`)
    }
  }

  baseData(): GameObjectData {
    return {
      id: this.originalID,
      name: this.originalName,
      attack: this.rawAttack,
      health: this.rawHealth,
      cost: this.rawCost,
      debt: 0,
      rent: 0,
      fervour: 0,
      growth: 0,
      income: 0,
      flags: this.baseFlags(),
    }
  }

  // putIntoPlay(index?: number): void {
  //   this.moveZone(this.inPlayZone, index)
  //   this.game.inPlay.push(this)
  // }

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
      const slot = this.controller().opponent.board[this.index()]
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
import FollowerCategoryString from '../stringTypes/FollowerCategoryString'
import GameObjectData from '../structs/GameObjectData'
import Permissions from '../dictionaries/Permissions'
import { ManualTargetReport } from '../structs/ObjectReport'
import { LocalisationString, LocalisedStringObject } from '../structs/Localisation'