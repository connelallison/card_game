import Card from './Card'
import ObjectReport from '../interfaces/ObjectReport'

abstract class Spell extends Card {
  constructor (game, owner, zone, id, name, rawCost, staticCardText, actions, targeted, targetDomain, targetConstraints) {
    super(game, owner, zone, id, name, 'spell', rawCost, staticCardText, actions, targeted, targetDomain, targetConstraints)
  }

  provideReport (): ObjectReport {
    this.updateFlags()
    this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.playerID,
      canBeSelected: this.canBePlayed(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }
}

export default Spell
