import Card from './Card'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import ZoneString from '../stringTypes/ZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import StaticEnchantment from './StaticEnchantment'
import AuraEnchantment from './AuraEnchantment'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Character extends Card {
  type: 'leader' | 'unit'
  rawAttack: number
  ready: boolean
  attack: number
  health: number

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: 'leader' | 'unit', rawCost: number, rawAttack: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetConstraints: TargetRequirement[]) {
    super(game, owner, zone, id, name, type, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetConstraints)
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

  updateStats(): void {
    const stats = this.baseStats()

    this.enchantments.forEach(enchantment => {
      if (
        enchantment instanceof StaticEnchantment
        && enchantment.categories.includes('stats')
        && enchantment.active()
      ) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'stats') effect.effect(stats, effect.value)
        })
      }
    })

    const auras: AuraEnchantment[] = this.game.auras.auras.stats[this.type][this.zone]
    auras.forEach(enchantment => {
      if (
        enchantment.targetRequirements.every(requirement => requirement(enchantment, this))
        && enchantment.categories.includes('stats')
      ) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'stats') effect.effect(stats, effect.value)
        })
      }
    })

    this.attack = stats.attack
    this.health = stats.health
  }

  updateValidTargets(): void {
    if (!this.inPlay() && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => requirement(this, target))
      })
      this.validTargets = newTargets
    } else if (this.inPlay()) {
      this.validTargets = (this.owner.opponent.leader as Character[]).concat(this.owner.opponent.board).filter(defender => {
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

  charOwner(): Character {
    return this
  }

  abstract baseStats(): { attack: number, health: number }
  abstract takeDamage(damage: number): void
  abstract inPlay(): boolean
}

export default Character