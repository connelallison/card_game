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
  validSlots?: string[]
  attackTargets?: string[]
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
  // index: number
  options: ActionActionReport[]
}

export interface ActionActionReport {
  name: string
  text: string
  // index: number
  targetedSteps: ManualTargetReport[][]
}

export interface ActionActionStepReport {

}

export interface ManualTargetReport {
  text: string
  validTargets: string[]
  // index: number
}

import { ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";