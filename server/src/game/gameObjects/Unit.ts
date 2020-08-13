import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import UnitZoneString from '../stringTypes/UnitZoneString'
import Action from '../functionTypes/Action'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Unit extends Character {
  zone: UnitZoneString
  inPlayZone: 'board'
  type: 'Unit'
  subtype: 'Generic' | 'Named'

  constructor(game: Game, owner: GamePlayer, zone: UnitZoneString, id: string, name: string, subtype: 'Generic' | 'Named', collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetConstraints: ((...args) => boolean)[]) {
    super(game, owner, zone, id, name, 'Unit', subtype, collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetConstraints)
    this.health = this.rawHealth,
    this.inPlayZone = 'board'

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = (this.owner.opponent.leaderZone as Character[]).concat(this.owner.opponent.board).filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => requirement(this, target))
      })
      this.validTargets = newTargets
    } else {
      this.validTargets = []
    }
  }

  takeDamage(damage: number): void {
    if (damage > 0) {
      this.rawHealth -= damage
      this.updateStats()
      console.log(`${this.name} takes ${damage} damage`)
    }
  }

  receiveHealing(healing: number): void {
    if (healing > 0) {
      this.rawHealth += healing
      this.updateStats()
      console.log(`${this.name} receives ${healing} healing`)
    }
  }

  inPlay(): boolean {
    return this.zone === 'board'
  }

  moveZone(destination: UnitZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  baseStats() {
    return { attack: this.rawAttack, health: this.rawHealth }
  }

  setStats(stats) {
    this.attack = stats.attack
    this.health = stats.health
  }
}

export default Unit
