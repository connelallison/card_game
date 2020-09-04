import GameObject from './GameObject'

abstract class Card extends GameObject {
  id: CardIDString
  originalID: CardIDString
  originalName: string
  owner: GamePlayer
  originalOwner: GamePlayer
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
  playRequirements: ActiveRequirementObject[]
  targeted: boolean
  targetDomain: () => GameObject[]
  targetRequirements: TargetRequirementObject[]
  validTargets: GameObject[]

  constructor(
    game: Game,
    owner: GamePlayer,
    id: string,
    name: string,
    type: CardTypeString,
    subtype: CardSubtypeString,
    collectable: boolean,
    rawCost: number,
    staticCardText: string = '',
    actions: ActionActionObject[][] = [],
    events: EventActionObject[][] = [],
    playRequirements: ActiveRequirementObject[],
    enchantments: EnchantmentIDString[],
    targeted: boolean = false,
    targetDomain: TargetsDomainString | TargetsDomainString[],
    targetRequirements: TargetRequirementObject[]
  ) {
    super(game, id, name, type, subtype)
    this.originalID = this.id
    this.originalName = this.name
    this.owner = owner
    this.originalOwner = owner
    this.zone = 'setAsideZone'
    this.collectable = collectable
    this.rawCost = rawCost
    this.cost = rawCost
    this.staticCardText = staticCardText
    this.actions = actions
    this.events = events
    this.playRequirements = playRequirements 
    this.targeted = targeted
    this.targetDomain = () => this.targetDomains(targetDomain)
    this.targetRequirements = targetRequirements 
    this.validTargets = []
    this.addBaseEnchantments(enchantments)
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