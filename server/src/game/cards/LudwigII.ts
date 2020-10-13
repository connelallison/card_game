import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'LudwigII',
    name: {
        english: `Ludwig II`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Noble'],
    collectable: true,
    cost: 2,
    attack: 1,
    health: 4,
    staticText: {
        english: `After you overheal your leader, gain Armour equal to the overhealing.`,
    },
    text: {
        templates: {
            english: `After you overheal your leader, gain Armour equal to the overhealing.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['LudwigIITrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class LudwigII extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default LudwigII