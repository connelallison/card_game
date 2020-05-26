const GameObject = require("./GameObject.js")

class Card extends GameObject {
  constructor (id, name, cost, type, owner = null) {
    super(id, name, type)
    this.cost = cost
    this.zone
    this.owner = owner
    this.objectID = `${this.id}:${Math.random()}`
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
