import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Kunstoffizier',
    name: {
        english: `Kunstoffizier`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Infamy'],
    categories: [],
    collectable: true,
    cost: 2,
    attack: 2,
    health: 3,
    charges: 2,
    staticText: {
        english: `After you discard a card, gain +1/+1.`,
    },
    text: {
        templates: {
            english: `After you discard a card, gain +1/+1.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['KunstoffizierTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Kunstoffizier extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Kunstoffizier