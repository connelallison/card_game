const Decks = {
  TestDeckOne: require('../decks/TestDeckOne'),
  TestDeckTwo: require('../decks/TestDeckTwo')
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
