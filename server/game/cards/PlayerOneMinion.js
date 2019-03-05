const Minion = require("../Minion.js");

class PlayerOneMinion extends Minion {
  constructor() {
    super("PlayerOneMinion", 2, 2, 3);
    this.name = "Player 1 Minion";
  }
}

module.exports = PlayerOneMinion;
