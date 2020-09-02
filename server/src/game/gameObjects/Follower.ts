import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import TargetsDomainString from '../stringTypes/TargetsDomainString'
import ActionObject from '../structs/ActionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import GameObjectData from '../structs/GameObjectData'
import BoardSlot from './BoardSlot'
import ObjectReport from '../structs/ObjectReport'
import EnchantmentIDString from '../stringTypes/EnchantmentIDString'
import Permissions from '../dictionaries/Permissions'
import FollowerCategoryString from '../stringTypes/FollowerCategoryString'
import ActionActionObject from '../structs/ActionActionObject'
import EventActionObject from '../structs/EventActionObject'

abstract class Follower extends Character {
  zone: FollowerZoneString
  inPlayZone: 'board'
  type: 'Follower'
  subtype: 'Nameless' | 'Famous'
  slot: BoardSlot
  validSlots: BoardSlot[]

  constructor(
    game: Game,
    owner: GamePlayer,
    zone: FollowerZoneString,
    id: string,
    name: string,
    subtype: 'Nameless' | 'Famous',
    categories: FollowerCategoryString[],
    collectable: boolean,
    rawCost: number,
    rawAttack: number,
    rawHealth: number,
    staticCardText: string = '',
    actions: ActionActionObject[][],
    events: EventActionObject[][],
    playRequirements: ActiveRequirementObject[],
    enchantments: EnchantmentIDString[],
    targeted: boolean,
    targetDomain: TargetsDomainString | TargetsDomainString[],
    targetRequirements: TargetRequirementObject[]
  ) {
    super(
      game,
      owner,
      zone,
      id,
      name,
      'Follower',
      subtype,
      collectable,
      rawCost,
      rawAttack,
      rawHealth,
      staticCardText,
      actions,
      events, 
      playRequirements,
      enchantments,
      targeted,
      targetDomain,
      targetRequirements
    )
    this.health = this.rawHealth
    this.maxHealth = this.rawHealth
    this.inPlayZone = 'board'
    this.slot = null
    // categories
    this.validSlots = []

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(): ObjectReport {
    // this.updateValidSlots()
    // this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      attack: this.attack,
      health: this.health,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
      validSlots: this.validSlotIDs(),
    }
  }

  updateArrays(): void {
    this.updateValidSlots()
    this.updateValidTargets()
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = (this.owner.opponent.leaderZone as Character[]).concat(this.owner.opponent.boardFollowers()).filter(defender => {
        return Permissions.canAttack(this, defender)
      })
    } else if (this.zone === 'hand' && this.targeted) {
      this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => this.targetRequirement(target, requirement)), this.targetDomain())
    } else {
      this.validTargets = []
    }
  }

  updateValidSlots(): void {
    if (this.zone === 'hand') {
      this.validSlots = this.controller().board.filter(slot => slot.isEmpty())
    } else {
      this.validSlots = []
    }
  }

  validSlotIDs(): string[] {
    return this.validSlots.map(slot => slot.objectID)
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

  baseData(): GameObjectData {
    return {
      attack: this.rawAttack,
      health: this.rawHealth,
      cost: this.rawCost,
      flags: this.baseFlags(),
    }
  }

  moveZone(destination: FollowerZoneString, index?: number): void {
    if (this.zone === 'board') {
      this.slot.follower = null
      this.slot = null
    } else {
      this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    }

    if (destination === 'board') {
      const slot = index ? this.controller().board[index] : this.controller().firstEmptySlot()
      if (slot instanceof BoardSlot) {
        slot.follower = this
        this.slot = slot
      }
    } else {
      this.owner[destination].push(this)
    }
    this.zone = destination
    this.updateEnchantments()
  }

  putIntoPlay(index?: number): void {
    this.moveZone(this.inPlayZone, index)
    this.game.inPlay.push(this)
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
}

export default Follower
