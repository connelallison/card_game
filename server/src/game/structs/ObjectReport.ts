import ObjectSubtypeString from "../stringTypes/ObjectSubtypeString";
import ObjectTypeString from "../stringTypes/ObjectTypeString";

interface ObjectReport {
  name: string,
  id: string,
  objectID: string,
  cost: number,
  attack?: number,
  health?: number,
  type: ObjectTypeString,
  subtype: ObjectSubtypeString
  zone: string,
  ownerName: string,
  playerID: string,
  canBeSelected: boolean,
  requiresTarget: boolean,
  validTargets: string[],
  staticCardText: string,
  validSlots?: string[]
}

export default ObjectReport