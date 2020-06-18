const Cards = {
  PlayerOneMinion: require('./cards/PlayerOneMinion.js'),
  PlayerTwoMinion: require('./cards/PlayerTwoMinion.js'),
  Footman: require('./cards/Footman.js'),
  JuniorOrc: require('./cards/JuniorOrc.js'),
  Fireburst: require('./cards/Fireburst.js'),
  Consume: require('./cards/Consume.js')
}

const create = function (game, owner, zone, cardID) {
  if (Cards[cardID]) {
    return new Cards[cardID](game, owner, zone)
  } else {
    throw new Error(`Card "${cardID}" not found in Cards.`)
  }
}

const CardLib = { create: create, Cards: Cards }

module.exports = CardLib
