const Hero = require('../Hero.js')

class GenericHero extends Hero {
    constructor(game, owner) {
        super(game, owner, 'GenericHero', 'Hero', 0) 
    }
}

module.exports = GenericHero