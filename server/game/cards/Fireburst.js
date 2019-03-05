const Spell = require("../Spell.js");

class Fireburst extends Spell {
  constructor() {
    super("Fireburst", 2);
    this.name = "Fireburst";
  }
}
module.exports = Fireburst;
