import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Helot',
    name: {
        english: `Helot`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 1,
    attack: 2,
    health: 1,
    charges: 3,
    staticText: {
        english: `Guard\nIf most of your followers are Helots, the Helots attack you and flee.`,
    },
    text: {
        templates: {
            english: `Guard\nIf most of your followers are Helots, the Helots attack you and flee.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Guard', 'HelotTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Helot extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Helot