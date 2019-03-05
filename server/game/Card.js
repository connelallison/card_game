
// class Card {
//   constructor(name, cost, playerClass, collectible) {
//     static collectibleCards = [];
//     this.name = name;
//     this.cost = cost;
//     this.playerClass = playerClass;
//     this.collectible = collectible;
//     // this.id = incrementID();
//     this.owner = false;
//     this.zone = false;
//     if (this.collectible) {
//       this.constructor.collectibleCards.push(this);
//     }
//     this.constructor.allCards.push(this);
//     // console.log(this.constructor.allCards);
//   }
//
//   draw(){
//     if (this.zone === this.owner.deck) {
//       this.zone = this.owner.hand;
//     }
//   }
//
//   play(){
//     return;
//   }
//
//
// }
//
// Card.collectibleCards = [];
// Card.allCards = [];
//
// console.log(Card.collectibleCards.length);
// console.log(Card.allCards.length);
//
// class Minion extends Card {
//   constructor(name, cost, attack, health, playerClass, collectible) {
//     super(name, cost, playerClass, collectible);
//     this.attack = attack;
//     this.health = health;
//   }
//
//   this.constructor.summon(){
//
//   }
// }
//
// console.log(Card.collectibleCards.length);
// console.log(Card.allCards.length);
//
// const testMinion1 = new Minion("Test Minion 1", 2, 3, 2, "warrior", false);
// const testMinion2 = new Minion("Test Minion 2", 3, 5, 2, "warrior", true);
//
// console.log(Card.collectibleCards.length);
// console.log(Card.allCards.length);


class Card {
  constructor(id, cost, owner=null) {
    this.name;
    this.id = id;
    this.cost = cost;
    this.type;
    this.zone;
    this.owner = owner;
  }

  isLegalMove(){
    // return this.zone = "hand";
    return true;
  }

  onDraw(){

  }

  onPlay(){

  }

  onGameStart(){

  }

  onAnyTurnStart(){

  }

  onMyTurnStart(){

  }

  onMyTurnEnd(){

  }
}
module.exports = Card;
