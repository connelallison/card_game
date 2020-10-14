import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'TupacShakur',
    name: {
        english: `Tupac Shakur`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 3,
    attack: 4,
    health: 3,
    staticText: {
        english: `Successor: Tupac Hologram\nAfter a friendly follower is attacked and killed, its adjacents retaliate.`,
    },
    text: {
        templates: {
            english: `Successor: Tupac Hologram\nAfter a friendly follower is attacked and killed, its adjacents retaliate.`,
        },
    },
    successor: 'TupacHologram',
    tooltips: [],
    stats: {},
    effects: ['TupacShakurTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class TupacShakur extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TupacShakur