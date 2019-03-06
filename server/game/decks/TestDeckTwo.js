const Deck = require("../Deck.js");
const { create } = require("../CardLib.js");


class TestDeckTwo extends Deck {
  constructor(player=null) {
    const cards = [
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("JuniorOrc"),
      create("Fireburst"),
      create("Fireburst"),
      create("Fireburst"),
      create("Fireburst"),
      create("Fireburst")
    ];
    super("TestDeckTwo", "Test Deck 2", player, cards);
  }
}

module.exports = TestDeckTwo;
