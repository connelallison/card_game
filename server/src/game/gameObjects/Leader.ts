import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import Character from './Character'
import LeaderZoneString from '../stringTypes/LeaderZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Leader extends Character {
  zone: LeaderZoneString
  type: 'leader'

  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString, id: string, name: string, rawCost: number, rawAttack: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetRequirements: TargetRequirement[]) {
    super(game, owner, zone, id, name, 'leader', rawCost, rawAttack, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    // this.health = 20
    this.health = this.owner.health,

      this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(): ObjectReport {
    this.updateStats()
    this.updateFlags()
    this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      attack: this.attack,
      health: this.health,
      type: this.type,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.playerID,
      canBeSelected: this.canAttack(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

    takeDamage(damage): void {
    if (damage > 0) {
      this.owner.health -= damage
      this.updateStats()
      console.log(`${this.owner.name} takes ${damage} damage`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  getReady(): void {
    this.ready = true
  }

  inPlay(): boolean {
    return this.zone === 'leader'
  }

  baseStats() {
    return { attack: this.rawAttack, health: this.owner.health }
  }

  moveZone(destination: LeaderZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Leader