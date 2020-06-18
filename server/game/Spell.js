const Card = require('./Card.js')

class Spell extends Card {
  constructor (game, owner, zone, id, name, cost, effects, targeted, targetDomain, targetConstraints) {
    super(game, owner, zone, id, name, 'spell', cost, effects, targeted, targetDomain, targetConstraints)
  }

  provideReport () {
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
      validTargets: this.validTargetIDs()
    }
  }
}

module.exports = Spell
