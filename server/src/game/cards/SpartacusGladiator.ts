import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'SpartacusGladiator',
    name: {
        english: `Spartacus, Gladiator`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: ['Barbarian', 'Underclass'],
    collectable: true,
    cost: 3,
    attack: 4,
    health: 3,
    staticText: {
        english: `Rush\nSuccessor: Spartacus\nYour followers can attack.`,
    },
    text: {
        templates: {
            english: `Rush\nSuccessor: Spartacus\nYour followers can attack.`,
        },
    },
    successor: 'Spartacus',
    tooltips: [],
    stats: {},
    effects: ['Rush', 'SpartacusGladiatorAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class SpartacusGladiator extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SpartacusGladiator