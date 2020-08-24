import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import FollowerZoneString from '../stringTypes/FollowerZoneString'
import TargetDomainString from '../stringTypes/TargetDomainString'
import ActionFunctionObject from '../structs/ActionFunctionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import PlayRequirementObject from '../structs/PlayRequirementObject'
import GameObjectData from '../structs/GameObjectData'

abstract class Follower extends Character {
  zone: FollowerZoneString
  inPlayZone: 'board'
  type: 'Follower'
  subtype: 'Nameless' | 'Famous'

  constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString, id: string, name: string, subtype: 'Nameless' | 'Famous', collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, owner, zone, id, name, 'Follower', subtype, collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    this.health = this.rawHealth
    this.maxHealth = this.rawHealth
    this.inPlayZone = 'board'

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = (this.owner.opponent.leaderZone as Character[]).concat(this.owner.opponent.board).filter(defender => {
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
      this.rawHealth -= damage
      this.update()
      console.log(`${this.name} takes ${damage} damage`)
    }
  }

  receiveHealing(rawHealing: number): void {
    if (rawHealing > 0) {
      const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
      this.rawHealth += healing
      this.update()
      console.log(`${this.name} receives ${healing} healing`)
    }
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

  moveZone(destination: FollowerZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Follower
