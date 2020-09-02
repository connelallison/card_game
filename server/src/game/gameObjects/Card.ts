import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import ZoneString from '../stringTypes/ZoneString'
import CardTypeString from '../stringTypes/CardTypeString'
import ActionFunction from '../functionTypes/ActionFunction'
import TargetRequirement from '../functionTypes/TargetRequirement'
import ActiveRequirement from '../functionTypes/ActiveRequirement'
import CardSubtypeString from '../stringTypes/CardSubtypeString'
import TargetsDomainString from '../stringTypes/TargetsDomainString'
import TargetDomains from '../dictionaries/TargetDomains'
import GameObjectData from '../structs/GameObjectData'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import ActionObject from '../structs/ActionObject'
import EnchantmentIDString from '../stringTypes/EnchantmentIDString'
import Enchantments from '../dictionaries/Enchantments'

abstract class Card extends GameObject {
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  collectable: boolean
  rawCost: number
  cost: number
  staticCardText: string
  actions: ActionFunction[]
  playRequirements: ActiveRequirement[]
  targeted: boolean
  targetDomain: () => any[]
  targetRequirements: TargetRequirement[]
  validTargets: any

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: CardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionObject[] = [], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, id, name, type, subtype)
    this.owner = owner
    this.zone = zone
    this.collectable = collectable
    this.rawCost = rawCost
    this.cost = rawCost
    this.staticCardText = staticCardText
    this.actions = actions.map(actionObj => this.wrapActionFunction(actionObj))
    this.playRequirements = playRequirements ? playRequirements.map(reqObj => this.wrapActiveRequirement(reqObj)) : null
    this.targeted = targeted
    this.targetDomain = TargetDomains(this, targetDomain)
    this.targetRequirements = targetRequirements ? targetRequirements.map(reqObj => this.wrapTargetRequirement(reqObj)) : null
    this.validTargets = []
    this.addBaseEnchantments(enchantments)
  }

  provideReport (): ObjectReport {
    // this.updateArrays()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  updateArrays(): void {
    this.updateValidTargets()
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain()
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => requirement(target))
      })
      this.validTargets = newTargets
      // this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => requirement(this, target)), this.targetDomain())
    } else {
      this.validTargets = []
    }
  }

  validTargetIDs(): string[] {
    return this.validTargets.map(target => target.objectID)
  }

  canBeSelected(): boolean {
    return this.canBePlayed()
  }

  canBePlayed(): boolean {
    return this.controller().canPlay(this)
  }

  baseData(): GameObjectData {
    return {
      cost: this.rawCost,
      flags: this.baseFlags(),
    }
  }

  index(): number {
    return (this.controller()[this.zone] as Card[]).indexOf(this)
  }

  cardOwner(): Card {
    return this
  }

  addBaseEnchantments(enchantments: EnchantmentIDString[]): void {
    enchantments.forEach(enchantment => this.addEnchantment(this.createEnchantment(enchantment, this)))
  }

  abstract moveZone(destination: ZoneString): void 
}
export default Card
