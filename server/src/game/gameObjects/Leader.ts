import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import LeaderZoneString from '../stringTypes/LeaderZoneString'
import WeaponCreation from './WeaponCreation'
import TargetDomainString from '../stringTypes/TargetDomainString'
import GameObjectData from '../structs/GameObjectData'
import FlagsObject from '../structs/FlagsObject'
import ActionFunctionObject from '../structs/ActionFunctionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import PlayRequirementObject from '../structs/PlayRequirementObject'

abstract class Leader extends Character {
  zone: LeaderZoneString
  inPlayZone: 'leaderZone'
  type: 'Leader'
  subtype: 'Leader'
  leaderTechniqueID: string

  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string, actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[], leaderPowerID: string) {
    super(game, owner, zone, id, name, 'Leader', 'Leader', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    this.inPlayZone = 'leaderZone'
    this.health = this.rawHealth
    this.leaderTechniqueID = leaderPowerID

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = this.owner.opponent.board.filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else if (this.zone === 'hand' && this.targeted) {
      this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => requirement(target)), this.targetDomain())
    } else {
      this.validTargets = []
    }
  }

  takeDamage(damage: number): void {
    if (damage > 0) {
      this.owner.currentHealth -= damage
      this.update()
      console.log(`${this.owner.name} takes ${damage} damage`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  receiveHealing(rawHealing: number): void {
    if (rawHealing > 0) {
      const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
      this.owner.currentHealth += healing
      this.update()
      console.log(`${this.owner.name} receives ${healing} healing`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  missingHealth(): number {
    return this.owner.maxHealth - this.owner.currentHealth
  }

  baseData(): GameObjectData {
    return {
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

  moveZone(destination: LeaderZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  putIntoPlay(): void {
    const health = this.health
    this.moveZone(this.inPlayZone)
    this.game.inPlay.push(this)
    this.owner.maxHealth += health
    this.owner.currentHealth += health
    this.game.phases.summonPhase({
      controller: this.controller(),
      cardID: this.leaderTechniqueID,
      objectSource: this,
      charSource: this
    })
  }
}

export default Leader