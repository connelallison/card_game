import GameObject from './GameObject'

export interface CardData {
  id: string
  name: LocalisedStringObject
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  cost: number
  debt?: number
  staticCardText: LocalisedStringObject
  dynamicCardText: DynamicCardTextObject
  actions?: ActionAction[]
  events?: EventAction[]
  // eurekas?: EurekaAction[]
  activeRequirements?: ActiveRequirement[]
  enchantments?: EnchantmentIDString[]
  targeted: boolean
  targetDomain?: TargetsDomainString | TargetsDomainString[]
  targetRequirements?: TargetRequirement[]
}

abstract class Card extends GameObject {
  static readonly data: CardData
  readonly data: CardData
  readonly originalID: CardIDString
  readonly originalName: LocalisedStringObject
  readonly originalOwner: GamePlayer
  id: CardIDString
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  rawCost: number
  cost: number
  debt: number
  staticCardText: LocalisedStringObject
  dynamicCardText: DynamicCardTextObject
  actions: ActionAction[]
  events: EventAction[]
  // eurekas: EurekaAction[]
  // tags: CardTagString[]
  // option: []
  activeRequirements: ActiveRequirement[]
  targeted: boolean
  targetDomain: () => GameObject[]
  targetRequirements: TargetRequirement[]
  validTargets: GameObject[]
  clonedFrom: Card

  constructor(game: Game, owner: GamePlayer, data: CardData) {
    super(game, data.id, data.name, data.type, data.subtype)
    this.classes = data.classes
    this.originalID = this.id
    this.originalName = this.name
    this.owner = owner
    this.originalOwner = owner
    this.zone = 'setAsideZone'
    this.collectable = data.collectable
    this.rawCost = data.cost
    this.cost = data.cost
    this.debt = 0
    this.staticCardText = data.staticCardText
    this.dynamicCardText = data.dynamicCardText
    this.actions = data.actions || []
    this.events = data.events || []
    // this.eurekas = data.eurekas || []
    this.activeRequirements = data.activeRequirements || []
    this.targeted = data.targeted
    this.targetDomain = () => this.targetDomains(data.targetDomain || [])
    this.targetRequirements = data.targetRequirements || []
    this.validTargets = []
    this.addBaseStatEnchantments(data)
    this.addBaseEnchantments(data.enchantments || [])
    this.data = data
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
    return {
      name: this.name[localisation],
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      targeted: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText[localisation],
      dynamicCardText: this.generateDynamicCardText(localisation),
    }
  }

  dynamicCardTextValue(valueObj: DynamicCardTextValueObject, localisation: LocalisationString = 'english'): string {
    if (valueObj.activeZones.includes(this.zone)) {
      const value = this.localisedDynamicValue(valueObj.value, localisation)
      if (value) {
        if (valueObj.templates) {
          return valueObj.templates[localisation].replace('$', value.toString())
        } else if (valueObj.fervour && this.controller().fervour > 0) {
          return `*${value.toString()}*`
        } else {
          return value.toString()
        }
      }
    }
    return valueObj.default.toString()
  }

  generateDynamicCardText(localisation: LocalisationString = 'english'): string {
    let template = this.dynamicCardText.templates[localisation]
    const values = this.dynamicCardText.dynamicValues || []
    for (let i = 0; i < values.length; i++) {
      template = template.replace(`$${i}`, this.dynamicCardTextValue(values[i], localisation))
    }
    return template
  }

  updateArrays(): void {
    this.updateValidTargets()
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain()
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => this.targetRequirement(requirement, target))
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
      debt: 0,
      flags: this.baseFlags(),
    }
  }


  index(): number {
    return (this.controller()[this.zone] as Card[]).indexOf(this)
  }

  addBaseStatEnchantments(data: CardData): void {
    if (data.debt) this.addEnchantment(new Enchantments.Debt(this.game, this, { statValue: data.debt }))
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
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  clone(): Card {
    const clone = new Cards[this.originalID](this.game, this.owner)
    Object.assign(clone, this.cloneData(clone))
    
    return clone
  }

  abstract moveZone(destination: ZoneString, index?: number): void
}

export default Card

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { CardIDString, EnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { ActionAction, EventAction } from '../structs/Action'
import { TargetsDomainString } from '../stringTypes/DomainString'
import { ObjectReport } from '../structs/ObjectReport'
import GameObjectData from '../structs/GameObjectData'
import { CardSubtypeString, CardTypeString, ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import Cards from '../dictionaries/Cards'
import { LocalisedStringObject, LocalisationString, DynamicCardTextObject, DynamicCardTextValueObject } from '../structs/Localisation'
import PlayerClassString from '../stringTypes/PlayerClassString'
import Enchantments from '../dictionaries/Enchantments'
import { ActiveRequirement, TargetRequirement } from '../structs/Requirement'
