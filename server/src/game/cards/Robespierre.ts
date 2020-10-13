import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'Robespierre',
    name: {
        english: `Robespierre`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 2,
    attack: 1,
    health: 1,
    staticText: {
        english: `Passionate, Fortune\nAt the end of your turn, gain Fervour 1.`,
    },
    text: {
        templates: {
            english: `Passionate, Fortune\nAt the end of your turn, gain Fervour 1.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Passionate', 'Fortune', 'RobespierreTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Robespierre extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Robespierre