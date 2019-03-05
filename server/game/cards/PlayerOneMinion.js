const Minion = require("../Minion.js");

class PlayerOneMinion extends Minion {
  constructor() {
    super("Player 1 Minion", 2, 2, 3);
  }
}

module.exports = PlayerOneMinion;
