import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'UnarmedSoviet',
    name: {
        english: `Unarmed Soviet`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['The People'],
    categories: [],
    collectable: true,
    cost: 1,
    attack: 0,
    health: 4,
    charges: 3,
    staticText: {
        english: `Passionate`,
    },
    text: {
        templates: {
            english: `Passionate`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Passionate'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class UnarmedSoviet extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default UnarmedSoviet