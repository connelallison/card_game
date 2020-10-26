import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'CDOTrader',
    name: {
        english: `CDO Trader`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 2,
    health: 4,
    charges: 2,
    staticText: {
        english: `Snipe\nPillage`,
    },
    text: {
        templates: {
            english: `Snipe\nPillage`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Snipe', 'Pillage'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class CDOTrader extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CDOTrader