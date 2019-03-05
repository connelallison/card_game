const Card = require("./Card.js");

class Minion extends Card {
  constructor(name, cost, attack, health) {
    super(name, cost);
    this.attack = attack;
    this.health = health;
    this.type = "minion";
    this.ready = false;
  }

  onPlay(){
    this.onSummon();
  }

  onSummon(){
    return;
  }

  onMyTurnStart(){
    if (this.zone === "board") {
      this.ready = true;
    }
  }

  isAttackable(){
    return true;
  }

  attackTargets(){
    let attackTargets = [];
    if (this.owner.opponent.isAttackable()) {
      attackTargets.push(this.owner.opponent);
    }
    attackTargets = attackTargets.concat(this.owner.opponent.board.filter((minion) => {
      return minion.isAttackable();
    }));
    return attackTargets;
  }

  canAttack(){
    console.log(this.ready && this.attackTargets().length > 0);
    return this.ready && this.attackTargets().length > 0;
  }
}

module.exports = Minion;
