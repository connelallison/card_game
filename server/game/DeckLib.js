const Decks = {
  TestDeckOne: require('./decks/TestDeckOne.js'),
  TestDeckTwo: require('./decks/TestDeckTwo.js')
}

const deck = function (game, owner, deckID) {
  if (Decks[deckID]) {
    return new Decks[deckID](game, owner)
  } else {
    throw new Error(`Deck "${deckID}" not found in Decks.`)
  }
}

const DeckLib = { deck: deck, Decks: Decks }

module.exports = DeckLib
