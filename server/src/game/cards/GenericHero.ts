import Hero from '../Hero'

class GenericHero extends Hero {
    constructor(game, owner) {
        super(game, owner, 'GenericHero', 'Hero', 0, '', null, false, null, null) 
    }
}

export default GenericHero