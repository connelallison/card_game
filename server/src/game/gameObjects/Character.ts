import Card from './Card'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../interfaces/ObjectReport'

abstract class Character extends Card {
  rawAttack: number
  ready: boolean
  attack: number
  health: number

  constructor(game: Game, owner: GamePlayer, zone: string, id: string, name: string, type: string, rawCost: number, rawAttack: number, staticCardText: string, effects: any[], targeted: boolean, targetDomain: any, targetConstraints: any) {
    super(game, owner, zone, id, name, type, rawCost, staticCardText, effects, targeted, targetDomain, targetConstraints)
    this.rawAttack = rawAttack
    this.attack = this.rawAttack
    this.ready = false

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
  
  updateValidTargets(): void {
    if (!this.inPlay() && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetConstraints.forEach(constraint => {
        newTargets = newTargets.filter(target => constraint(this.controller(), this, target))
      })
      this.validTargets = newTargets
    } else if (this.inPlay()) {
      this.validTargets = [this.owner.opponent.hero as Character].concat(this.owner.opponent.board).filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else {
      this.validTargets = []
    }
  }

  startOfTurn(event): void {
    if (event.activePlayer === this.controller() && this.inPlay()) {
      this.getReady()
    }
  }

  getReady(): void {
    this.ready = true
  }

  canAttack(): boolean {
    return this.owner.myTurn() && this.ready && this.inPlay() && this.attack > 0
  }

  abstract updateStats(): void 
  abstract takeDamage(damage: number): void 
  abstract inPlay(): boolean
}

export default Character