var Decks = {
    TestDeckOne: require('./decks/TestDeckOne'),
    TestDeckTwo: require('./decks/TestDeckTwo')
};
var deck = function (game, owner, deckID) {
    if (Decks[deckID]) {
        return new Decks[deckID](game, owner);
    }
    else {
        throw new Error("Deck \"" + deckID + "\" not found in Decks.");
    }
};
var DeckLib = { deck: deck, Decks: Decks };
module.exports = DeckLib;
