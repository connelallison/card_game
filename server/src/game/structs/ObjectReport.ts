interface ObjectReport {
  name: string,
  id: string,
  objectID: string,
  cost: number,
  attack?: number,
  health?: number,
  type: string,
  zone: string,
  ownerName: string,
  playerID: string,
  canBeSelected: boolean,
  requiresTarget: boolean,
  validTargets: string[],
  staticCardText: string,
}

export default ObjectReport