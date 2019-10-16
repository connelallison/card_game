const GamePlayer = require('../GamePlayer.js')
const Game = require('../Game.js')
const Cards = require('../CardLib')
const Card = require('../Card.js')
const Minion = require('../Minion.js')
const Spell = require('../Spell.js')
const { Deck, deck1, deck2 } = require('../Deck.js')

const testGame = new Game(deck1, deck2, false, true)
