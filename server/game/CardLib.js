const Cards = {
  "Player 1 Minion": require('./cards/PlayerOneMinion.js'),
  "Player 2 Minion": require('./cards/PlayerTwoMinion.js'),
  "Footman": require('./cards/Footman.js'),
  "Junior Orc": require('./cards/JuniorOrc.js'),
  "Fireburst": require('./cards/Fireburst.js')
}

const create = function (cardName) {
  if (Cards[cardName]) {
    return new Cards[cardName]();
  } else {
    throw "Card not found in Cards.";
  }
}

const CardLib = { create: create, Cards: Cards};

module.exports = CardLib;
