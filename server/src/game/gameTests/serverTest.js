const GamePlayer = require('../GamePlayer')
const Game = require('../Game')
const Cards = require('../CardLib')
const Card = require('../Card')
const Unit = require('../Unit')
const Spell = require('../Spell')
const { Deck, deck1, deck2 } = require('../Deck')

const testGame = new Game(deck1, deck2, false, true)
