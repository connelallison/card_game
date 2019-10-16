const Decks = {
  TestDeckOne: require('./decks/TestDeckOne.js'),
  TestDeckTwo: require('./decks/TestDeckTwo.js')
}

const deck = function (deckID, player) {
  if (Decks[deckID]) {
    return new Decks[deckID](player)
  } else {
    throw new Error(`Deck "${deckID}" not found in Decks.`)
  }
}

const DeckLib = { deck: deck, Decks: Decks }

module.exports = DeckLib
