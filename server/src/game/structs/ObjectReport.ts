export interface ObjectReport {
  name: string,
  id: string,
  objectID: string,
  cost: number,
  attack?: number,
  health?: number,
  charges?: number,
  type: ObjectTypeString,
  subtype: ObjectSubtypeString
  zone: string,
  ownerName: string,
  playerID: string,
  canBeSelected: boolean,
  requiresTarget: boolean,
  validTargets: string[],
  staticCardText: string,
  dynamicCardText: string,
  validSlots?: string[],
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

import { ObjectTypeString } from "../stringTypes/ObjectTypeString";
import { ObjectSubtypeString } from "../stringTypes/ObjectSubtypeString";
