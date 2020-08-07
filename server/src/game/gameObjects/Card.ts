import GameObject from './GameObject'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../interfaces/ObjectReport'
import StaticEnchantment from './StaticEnchantment'

abstract class Card extends GameObject {
  owner: GamePlayer
  zone: string
  rawCost: number
  cost: number
  staticCardText: string
  actions: any
  targeted: boolean
  targetDomain: any
  targetConstraints: any
  validTargets: any
  flags: any

  constructor(game: Game, owner: GamePlayer, zone: string, id: string, name: string, type: string, rawCost: number, staticCardText: string = '', actions: any[] = [], targeted: boolean = false, targetDomain: any, targetConstraints: any) {
    super(game, owner, id, name, type)
    this.zone = zone
    this.rawCost = rawCost
    this.cost = rawCost
    this.staticCardText = staticCardText
    this.actions = actions
    this.targeted = targeted
    this.targetDomain = targetDomain
    this.targetConstraints = targetConstraints
    this.validTargets = []
    this.flags = {}
  }

  provideReport(): ObjectReport {
    this.updateFlags()
    this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.playerID,
      canBeSelected: this.canBePlayed(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  updateFlags(): void {
    const flags = {

    }

    this.enchantments.forEach(enchantment => {
      if (
        enchantment instanceof StaticEnchantment
        && enchantment.categories.includes('flags')
        && enchantment.active
      ) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'flags') effect.effect(flags, effect.value)
        })
      }
    })

    this.game.auras.auras.flags[this.type][this.zone].forEach(enchantment => {
        if (enchantment.targetRequirements.every(requirement => requirement(this, enchantment))) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'flags') effect.effect(flags, effect.value)
        })
      }
    })

    this.flags = flags
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetConstraints.forEach(constraint => {
        newTargets = newTargets.filter(target => constraint(this.controller(), this, target))
      })
      this.validTargets = newTargets
    } else {
      this.validTargets = []
    }
  }

  moveZone(destination: string): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  validTargetIDs(): string[] {
    return this.validTargets.map(target => target.objectID)
  }

  canBePlayed(): boolean {
    return this.owner.canPlay(this)
  }
}
export default Card
