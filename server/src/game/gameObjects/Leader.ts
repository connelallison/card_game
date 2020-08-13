import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import Character from './Character'
import LeaderZoneString from '../stringTypes/LeaderZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'
import WeaponCreation from './WeaponCreation'

abstract class Leader extends Character {
  zone: LeaderZoneString
  inPlayZone: 'leaderZone'
  type: 'Leader'
  subtype: 'Leader'
  leaderPowerID: string

  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetRequirements: TargetRequirement[], leaderPowerID: string) {
    super(game, owner, zone, id, name, 'Leader', 'Leader', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    this.inPlayZone = 'leaderZone'
    if (this.inPlay()) {
      this.health = this.owner.health
    } else {
      this.health = this.rawHealth
    }
    this.leaderPowerID = leaderPowerID

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  updateValidTargets(): void {
    if (this.inPlay()) {
      this.validTargets = this.owner.opponent.board.filter(defender => {
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
      this.owner.health -= damage
      this.updateStats()
      console.log(`${this.owner.name} takes ${damage} damage`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  receiveHealing(healing: number): void  {
    if (healing > 0) {
      this.owner.health += healing
      this.updateStats()
      console.log(`${this.owner.name} receives ${healing} healing`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  baseStats() {
    if (this.inPlay()) {
      const weaponsAttack = (this.controller().creationZone
                              .filter(creation => creation instanceof WeaponCreation) as WeaponCreation[])
                              .map(weapon => weapon.attack)
                              .reduce((acc, val) => acc + val, 0)
      return { attack: this.rawAttack + weaponsAttack, health: this.owner.health }
    } else {
      return { attack: this.rawAttack, health: this.rawHealth }
    }
  }

  setStats(stats) {
    if (!this.inPlay() || this.controller().myTurn()) {
      this.attack = stats.attack
    } else {
      this.attack = 0
    }

    this.health = stats.health
  }

  baseFlags() {
    if (this.inPlay()) {
      const weaponsFlags = this.controller().creationZone.filter(creation => creation instanceof WeaponCreation).map(weapon => weapon.flags)
      return Object.assign({}, ...weaponsFlags)
    } 
    return {}
  }

  moveZone(destination: LeaderZoneString): void {
    if (this.zone !== 'setAside') this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  putIntoPlay(): void {
    const health = this.health
    this.moveZone(this.inPlayZone)
    this.game.inPlay.push(this)
    this.owner.health += health
    this.game.phases.summonPhase({
      controller: this.controller(),
      cardID: this.leaderPowerID,
      objectSource: this,
      charSource: this
    })
}
}

export default Leader