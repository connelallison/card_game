const GameObject = require("./GameObject.js")

class Card extends GameObject {
  constructor (game, owner, zone, id, name, cost, type) {
    super(game, owner, id, name, type)
    this.cost = cost
    this.zone = zone
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

  moveZone(destination) {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  isLegalMove () {
    // return this.zone = "hand";
    return true
  }

  playTargets () {
    return null;
  }

  validTargetIDs () {
    if (this.zone === "hand") {
      return this.playTargets()
    }
  }

  canBePlayed () {
    return this.owner.myTurn() && this.owner.hand.includes(this) && this.cost <= this.owner.currentMana && this.isLegalMove()
  }

  onDraw () {

  }

  onPlay () {

  }

  onGameStart () {

  }

  onAnyTurnStart () {

  }

  onMyTurnStart () {

  }

  onMyTurnEnd () {

  }
}
module.exports = Card
