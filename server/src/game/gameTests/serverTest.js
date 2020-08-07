const GamePlayer = require('../GamePlayer')
const Game = require('../Game')
const Cards = require('../CardLib')
const Card = require('../Card')
const Minion = require('../Minion')
const Spell = require('../Spell')
const { Deck, deck1, deck2 } = require('../Deck')

const testGame = new Game(deck1, deck2, false, true)
