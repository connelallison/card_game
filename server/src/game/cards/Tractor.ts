import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Tractor',
    name: {
        english: `Tractor`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: ['Tech'],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 4,
    charges: 1,
    staticText: {
        english: `At the start of your turn, draw a card.`,
    },
    text: {
        templates: {
            english: `At the start of your turn, draw a card.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['TractorTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Tractor extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Tractor