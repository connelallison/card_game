const Card = require('./Card.js')

class Spell extends Card {
  constructor (name, cost) {
    super(name, cost)
    this.type = 'spell'
  }

  provideReport () {
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
      validTargets: this.validTargetIDs()
    }
  }
  
}

module.exports = Spell
