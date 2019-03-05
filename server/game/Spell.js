const Card = require("./Card.js");

class Spell extends Card {
  constructor(name, cost) {
    super(name, cost);
    this.type = "spell";
  }
}

module.exports = Spell;
