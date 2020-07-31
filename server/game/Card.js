const GameObject = require("./GameObject.js")

class Card extends GameObject {
  constructor (game, owner, zone, id, name, type, cost, staticCardText = '', effects = [], targeted = false, targetDomain, targetConstraints) {
    super(game, owner, id, name, type)
    this.zone = zone
    this.cost = cost
    this.staticCardText = staticCardText
    this.effects = effects
    this.targeted = targeted
    this.targetDomain = targetDomain
    this.targetConstraints = targetConstraints
    this.validTargets = []
  }

  provideReport () {
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

  updateValidTargets() {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetConstraints.forEach(constraint => {
        newTargets = newTargets.filter(target => constraint(this.controller(), this, target))
      })
      this.validTargets = newTargets
    } else {
      this.validTargets = []
    }
  }

  moveZone(destination) {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  validTargetIDs () {
    return this.validTargets.map(target => target.objectID)
  }

  canBePlayed () {
    return this.owner.canPlay(this)
  }
}
module.exports = Card
