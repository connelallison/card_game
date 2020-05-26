const Card = require('./Card.js')

class Spell extends Card {
  constructor (id, name, cost) {
    super(id, name, cost, 'spell')
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
