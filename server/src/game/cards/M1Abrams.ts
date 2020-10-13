import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'M1Abrams',
    name: {
        english: `M1 Abrams`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Tech'],
    collectable: true,
    cost: 5,
    attack: 3,
    health: 6,
    charges: 1,
    staticText: {
        english: `Snipe, Rush`,
    },
    text: {
        templates: {
            english: `Snipe, Rush`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Snipe', 'Rush'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class M1Abrams extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default M1Abrams