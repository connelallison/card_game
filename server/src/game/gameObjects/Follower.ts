import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import TargetDomainString from '../stringTypes/TargetDomainString'
import ActionFunctionObject from '../structs/ActionFunctionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import PlayRequirementObject from '../structs/PlayRequirementObject'
import GameObjectData from '../structs/GameObjectData'
import e = require('express')
import BoardSlot from './BoardSlot'
import ObjectReport from '../structs/ObjectReport'

abstract class Follower extends Character {
  zone: FollowerZoneString
  inPlayZone: 'board'
  type: 'Follower'
  subtype: 'Nameless' | 'Famous'
  validSlots: BoardSlot[]

  constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString, id: string, name: string, subtype: 'Nameless' | 'Famous', collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, owner, zone, id, name, 'Follower', subtype, collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    this.health = this.rawHealth
    this.maxHealth = this.rawHealth
    this.inPlayZone = 'board'
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
        return this.game.permissions.canAttack(this, defender)
      })
    } else if (this.zone === 'hand' && this.targeted) {
      this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => requirement(target)), this.targetDomain())
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
    this.update()
    return damage
  }

  receiveHealing(rawHealing: number): number {
    const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
    this.rawHealth += healing
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
      this.controller().board[this.index()].follower = null
    } else {
      this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    }

    if (destination === 'board') {
      const slot = index ? this.controller().board[index] : this.controller().firstEmptySlot()
      if (slot instanceof BoardSlot) slot.follower = this
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
      return this.controller().board.findIndex(slot => slot.follower === this)
    }
    return this.controller()[this.zone].indexOf(this)
  }
}

export default Follower
