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
  zone: string
  ownerName: string
  playerID: string
  canBeSelected: boolean
  // targeted: boolean,
  // validTargets: string[],
  staticText: string
  text: string
  options: OptionActionReport[]
  actions: ActionActionReport[]
  validSlots?: ManualTargetReport
  attackTargets?: ManualTargetReport
}

export interface BoardSlotReport {
  name: string,
  id: string,
  objectID: string,
  attack: number,
  health: number,
  type: ObjectTypeString,
  subtype: ObjectSubtypeString
  zone: string,
  ownerName: string,
  playerID: string,
  follower: ObjectReport,
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
}

export interface MoveRequest {
  selected: string
  attackTarget: string
  selectedSlot: string
  options: OptionChoiceRequest[]
  actions: string[][][]
}

import { ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";
import { OptionChoiceRequest } from "./Action";