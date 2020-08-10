import GameObject from './GameObject'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import StaticEnchantment from './StaticEnchantment'
import ZoneString from '../stringTypes/ZoneString'
import CardTypeString from '../stringTypes/CardTypeString'
import Action from '../functionTypes/Action'
import Character from './Character'
import TargetRequirement from '../functionTypes/TargetRequirement'
import AuraEnchantment from './AuraEnchantment'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Card extends GameObject {
  owner: GamePlayer
  zone: ZoneString
  type: CardTypeString
  rawCost: number
  cost: number
  staticCardText: string
  actions: Action[]
  playRequirements: PlayRequirement[]
  targeted: boolean
  targetDomain: any
  targetRequirements: TargetRequirement[]
  validTargets: any
  flags: any

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: CardTypeString, rawCost: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[],  targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
    super(game, owner, id, name, type)
    this.zone = zone
    this.rawCost = rawCost
    this.cost = rawCost
    this.staticCardText = staticCardText
    this.actions = actions
    this.playRequirements = playRequirements
    this.targeted = targeted
    this.targetDomain = targetDomain
    this.targetRequirements = targetRequirements
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
        && enchantment.active()
      ) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'flags') effect.effect(flags, effect.value)
        })
      }
    })

    const auras: AuraEnchantment[] = this.game.auras.auras.flags[this.type][this.zone]
    auras.forEach(enchantment => {
        if (
          enchantment.targetRequirements.every(requirement => requirement(enchantment, this))
          && enchantment.categories.includes('flags')
        ) {
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
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => requirement(this, target))
      })
      this.validTargets = newTargets
    } else {
      this.validTargets = []
    }
  }

  validTargetIDs(): string[] {
    return this.validTargets.map(target => target.objectID)
  }

  canBePlayed(): boolean {
    return this.owner.canPlay(this)
  }

  abstract moveZone(destination: ZoneString): void 
}
export default Card
