import GameObject from './GameObject'

export interface CardData {
  id: string
  name: string
  type: CardTypeString
  subtype: CardSubtypeString
  collectable: boolean
  cost: number
  staticCardText: string
  actions?: ActionActionObject[][]
  events?: EventActionObject[][]
  activeRequirements?: ActiveRequirementObject[]
  enchantments?: EnchantmentIDString[]
  targeted: boolean
  targetDomain?: TargetsDomainString | TargetsDomainString[]
  targetRequirements?: TargetRequirementObject[]
}

abstract class Card extends GameObject {
  static readonly data: CardData
  readonly data: CardData
  readonly originalID: CardIDString
  readonly originalName: string
  readonly originalOwner: GamePlayer
  id: CardIDString
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  collectable: boolean
  rawCost: number
  cost: number
  staticCardText: string
  actions: ActionActionObject[][]
  events: EventActionObject[][]
  // tags: CardTagString[]
  // option: []
  activeRequirements: ActiveRequirementObject[]
  targeted: boolean
  targetDomain: () => GameObject[]
  targetRequirements: TargetRequirementObject[]
  validTargets: GameObject[]
  clonedFrom: Card

  constructor(game: Game, owner: GamePlayer, data: CardData) {
    super(game, data.id, data.name, data.type, data.subtype)
    this.originalID = this.id
    this.originalName = this.name
    this.owner = owner
    this.originalOwner = owner
    this.zone = 'setAsideZone'
    this.collectable = data.collectable
    this.rawCost = data.cost
    this.cost = data.cost
    this.staticCardText = data.staticCardText
    this.actions = data.actions || []
    this.events = data.events || []
    this.activeRequirements = data.activeRequirements || []
    this.targeted = data.targeted
    this.targetDomain = () => this.targetDomains(data.targetDomain || [])
    this.targetRequirements = data.targetRequirements || []
    this.validTargets = []
    this.addBaseEnchantments(data.enchantments || [])
    this.data = data
  }

  provideReport(): ObjectReport {
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
        newTargets = newTargets.filter(target => this.targetRequirement(target, requirement))
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
      id: this.originalID,
      name: this.originalName,
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

  cloneData(clone) {
    return {
      clonedFrom: this,
      rawCost: this.rawCost,
      cost: this.cost,
      actions: JSON.parse(JSON.stringify(this.actions)),
      events: JSON.parse(JSON.stringify(this.events)),
      enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
      auraEffects: JSON.parse(JSON.stringify(this.auraEffects)),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  clone(): Card {
    const clone = new Cards[this.originalID](this.game, this.owner)
    Object.assign(clone, this.cloneData(clone))
    
    return clone
  }

  abstract moveZone(destination: ZoneString): void
}

export default Card

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { CardIDString, EnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { CardTypeString } from '../stringTypes/ObjectTypeString'
import { CardSubtypeString } from '../stringTypes/ObjectSubtypeString'
import { ActionActionObject, EventActionObject } from '../structs/ActionObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import { TargetsDomainString } from '../stringTypes/DomainString'
import { ObjectReport } from '../structs/ObjectReport'
import GameObjectData from '../structs/GameObjectData'
import { ZoneString } from '../stringTypes/ZoneString'
import Cards from '../dictionaries/Cards'