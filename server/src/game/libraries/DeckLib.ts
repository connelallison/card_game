import TestDeckOne from '../decks/TestDeckOne'
import TestDeckTwo from '../decks/TestDeckTwo'

const Decks = {
  TestDeckOne,
  TestDeckTwo,
}

export default Decks

// const deck = function (game, owner, deckID) {
//   if (Decks[deckID]) {
//     return new Decks[deckID](game, owner)
//   } else {
//     throw new Error(`Deck "${deckID}" not found in Decks.`)
//   }
// }

// const DeckLib = { deck: deck, Decks: Decks }

// module.exports = DeckLib
