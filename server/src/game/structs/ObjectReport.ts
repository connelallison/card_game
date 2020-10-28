export interface StaticObjectReport {
  name: string
  id: string
  cost: number
  attack?: number
  health?: number
  charges?: number
  type: ObjectTypeString
  subtype: ObjectSubtypeString
  classes: PlayerClassString[]
  text: string
  categories?: string[]
  relatedCard: StaticObjectReport
}

export interface ObjectReport {
  name: string
  id: string
  objectID: string
  cost: number
  attack?: number
  health?: number
  charges?: number
  type: ObjectTypeString
  subtype: ObjectSubtypeString
  discounted: boolean
  classes: PlayerClassString[]
  fortune?: boolean
  guard?: boolean
  damaged?: boolean
  attackBuffed?: boolean
  healthBuffed?: boolean
  zone: string
  ownerName: string
  playerID: string
  canBeSelected: boolean
  // targeted: boolean,
  // validTargets: string[],
  staticText: string
  text: string
  tooltips: LocalisedNameAndText[]
  addedText: LocalisedNameAndText[]
  relatedCard: StaticObjectReport
  categories?: string[]
  options: OptionActionReport[]
  actions: ActionActionReport[]
  validSlots?: ManualTargetReport
  attackTargets?: ManualTargetReport
}

export interface BoardSlotReport {
  name: string
  id: string
  objectID: string
  attack: number
  health: number
  type: ObjectTypeString
  subtype: ObjectSubtypeString
  zone: string
  ownerName: string
  addedText: LocalisedNameAndText[]
  playerID: string
  follower: ObjectReport
}

export interface OptionActionReport {
  name: string
  text: string
  actions: ActionActionReport[]
}

export interface ActionActionReport {
  name: string
  text: string
  targetedSteps: ActionActionStepReport[]
}

export interface ActionActionStepReport {
  manualTargets: ManualTargetReport[]
}

export interface ManualTargetReport {
  text: string
  validTargets: string[]
  hostile: boolean
  highlightedTargets: string[]
}

export interface MoveRequest {
  selected: string
  attackTarget: string
  selectedSlot: string
  options: OptionChoiceRequest[]
  actions: string[][][]
}

import PlayerClassString from "../stringTypes/PlayerClassString";
import { ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";
import { OptionChoiceRequest } from "./Action";
import { LocalisedNameAndText } from "./Localisation";
