const Card = require("./Card.js");

class Minion extends Card {
  constructor(id, cost, attack, health) {
    super(id, cost);
    this.attack = attack;
    this.health = health;
    this.type = "minion";
    this.ready = false;
  }

  onPlay(){
    this.afterThisSummoned();
  }

  onDeath(){

  }

  afterThisSummoned(){

  }

  afterTakingDamage(){

  }

  readyMinion(){
    if (this.zone === "board") {
      this.ready = true;
    }
    else {
      throw new Error(`readyMinion() is being called on a minion (${this.name}) with this.zone not set to board`)
    }
  }

  isAttackable(){
    return true;
  }

  takeDamage(damage){
    if (damage > 0) {
      this.health -= damage;
      console.log(`${this.name} takes ${damage} damage`);
      this.afterTakingDamage();
    }
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
    // console.log(this.ready);
    // console.log(this.attackTargets().length > 0);
    // console.log(this.ready && this.attackTargets().length > 0);
    return this.ready && this.attackTargets().length > 0;
  }

  makeAttack(target){
    if (!this.owner.game.gameOver && target.isAttackable() && this.canAttack()) {
      // this.owner.game.
      console.log(`${this.name} is attacking ${target.name}`);
      console.log(`${this.name}'s attack is ${this.attack}`);
      console.log(`${target.name}'s attack is ${target.attack}`);
      target.takeDamage(this.attack);
      this.takeDamage(target.attack);
      this.ready = false;
      this.owner.game.resolveCombat()
    }
  }
}

module.exports = Minion;
