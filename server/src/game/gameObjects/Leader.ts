import Character, { CharacterData } from './Character'

export interface LeaderData extends CharacterData {
  type: 'Leader'
  subtype: 'Leader'
  starter: boolean
  leaderTechniqueID: CardIDString
}

abstract class Leader extends Character {
  static readonly data: LeaderData
  readonly data: LeaderData
  zone: LeaderZoneString
  inPlayZone: 'leaderZone'
  type: 'Leader'
  subtype: 'Leader'
  leaderTechniqueID: CardIDString
  starter: boolean

  constructor(game: Game, owner: GamePlayer, data: LeaderData) {
    super(game, owner, data)
    this.inPlayZone = 'leaderZone'
    this.leaderTechniqueID = data.leaderTechniqueID
    this.starter = data.starter

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
    return {
      name: this.name[localisation],
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      attack: this.attack,
      health: this.health,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText[localisation],
      dynamicCardText: this.generateDynamicCardText(localisation),
    }
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = this.owner.opponent.boardFollowers().filter(defender => {
        return Permissions.canAttack(this, defender)
      })
    } else if (this.zone === 'hand' && this.targeted) {
      this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => this.targetRequirement(target, requirement)), this.targetDomain())
    } else {
      this.validTargets = []
    }
  }

  takeDamage(damage: number): number {
    this.owner.currentHealth -= damage
    this.update()
    return damage
    // console.log(`${this.owner.name} takes ${damage} damage`)
    // console.log(`${this.owner.name} now has ${this.health} health`)
  }

  receiveHealing(rawHealing: number): number {
    const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
    this.owner.currentHealth += healing
    this.update()
    return healing
    // console.log(`${this.owner.name} receives ${healing} healing`)
    // console.log(`${this.owner.name} now has ${this.health} health`)
  }

  missingHealth(): number {
    return this.owner.maxHealth - this.owner.currentHealth
  }

  baseData(): GameObjectData {
    return {
      id: this.originalID,
      name: this.originalName,
      attack: this.baseAttack(),
      health: this.baseHealth(),
      cost: this.rawCost,
      flags: this.baseFlags(),
    }
  }

  baseAttack(): number {
    if (this.inPlay()) {
      const weaponsAttack = (this.controller().creationZone
        .filter(creation => creation instanceof WeaponCreation) as WeaponCreation[])
        .map(weapon => weapon.attack)
        .reduce((acc, val) => acc + val, 0)
      return this.rawAttack + weaponsAttack
    } else {
      return this.rawAttack
    }
  }

  baseHealth(): number {
    if (this.inPlay()) {
      return this.owner.currentHealth
    } else {
      return this.rawHealth
    }
  }

  baseFlags(): FlagsObject {
    if (this.inPlay()) {
      const weaponsFlags = this.controller().creationZone.filter(creation => creation instanceof WeaponCreation).map(weapon => weapon.flags)
      return Object.assign({}, ...weaponsFlags)
    }
    return {}
  }

  toggleAttack(dataObj: GameObjectData): void {
    if (this.inPlay() && !this.controller().myTurn()) dataObj.attack = 0
  }

  setData(dataObj: GameObjectData): void {
    this.toggleAttack(dataObj)
    Object.assign(this, dataObj)
  }

  moveZone(destination: LeaderZoneString, index?: number): void {
    if (destination === 'leaderZone' && this.owner.leaderZone[0]) this.owner.leaderZone[0].moveZone('graveyard')
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
    else this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  putIntoPlay(): void {
    const health = this.health
    this.moveZone(this.inPlayZone)
    this.game.inPlay.push(this)
    this.owner.maxHealth += health
    this.owner.currentHealth += health
    if (this.game.activeChild) {
      const summonEvent = new SummonEvent(this.game, {
        controller: this.controller(),
        cardID: this.leaderTechniqueID,
        objectSource: this,
        charSource: this
      })
      this.game.startNewDeepestPhase('SummonPhase', summonEvent)
    }
  }
}

export default Leader

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { LeaderZoneString } from '../stringTypes/ZoneString'
import { CardIDString } from '../stringTypes/DictionaryKeyString'
import { ObjectReport } from '../structs/ObjectReport'
import GameObjectData from '../structs/GameObjectData'
import WeaponCreation from './WeaponCreation'
import FlagsObject from '../structs/FlagsObject'
import Permissions from '../dictionaries/Permissions'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { LocalisationString } from '../structs/Localisation'
