import ObjectTypeString from "../stringTypes/ObjectTypeString";
import ObjectSubtypeString from "../stringTypes/ObjectSubtypeString";
import ObjectReport from "./ObjectReport";

interface BoardSlotReport {
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

export default BoardSlotReport