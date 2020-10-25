import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'GeorgeMarshall',
    name: {
        english: `George Marshall`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 5,
    attack: 3,
    health: 4,
    staticText: {
        english: `Both players have Growth 1.`,
    },
    text: {
        templates: {
            english: `Both players have Growth 1.`,
        },
    },
    tooltips: ['growth'],
    stats: {},
    effects: ['GeorgeMarshallAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class GeorgeMarshall extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default GeorgeMarshall