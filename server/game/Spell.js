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
      objectId: this.objectId,
      cost: this.cost,
      type: this.type,
      zone: this.zone,
      ownerName: this.owner.name
    }
  }
}

module.exports = Spell
