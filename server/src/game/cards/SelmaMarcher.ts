import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'SelmaMarcher',
    name: {
        english: `Selma Marcher`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['The People'],
    categories: [],
    collectable: true,
    cost: 2,
    attack: 3,
    health: 6,
    charges: 2,
    staticText: {
        english: `Passionate\nSelma Marcher can't attack.`,
    },
    text: {
        templates: {
            english: `Passionate\nSelma Marcher can't attack.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Passionate', 'SelmaMarcherAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class SelmaMarcher extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SelmaMarcher