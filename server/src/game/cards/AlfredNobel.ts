import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AlfredNobel',
    name: {
        english: `Alfred Nobel`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 4,
    attack: 3,
    health: 6,
    staticText: {
        english: `After you play a technique, give it +2 charges.`,
    },
    text: {
        templates: {
            english: `After you play a technique, give it +2 charges.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['AlfredNobelTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class AlfredNobel extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AlfredNobel