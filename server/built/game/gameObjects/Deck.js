// const Card = require("./Card");
// const Minion = require("./Minion");
// const Spell = require("./Spell");
var create = require('../libraries/CardLib').create;
var Deck = /** @class */ (function () {
    function Deck(game, owner, deckID, deckName, cards) {
        var _this = this;
        this.game = game;
        this.owner = owner;
        this.id = deckID;
        this.name = deckName;
        this.cards = cards.map(function (cardID) { return create(_this.game, _this.owner, 'deck', cardID); });
        this.shuffle();
    }
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    return Deck;
}());
module.exports = Deck;
