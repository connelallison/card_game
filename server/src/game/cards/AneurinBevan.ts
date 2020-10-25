import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AneurinBevan',
    name: {
        english: `Aneurin Bevan`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 5,
    attack: 3,
    health: 8,
    staticText: {
        english: `At the end of your turn, Nourish Health to your leader equal to your unspent Money.`,
    },
    text: {
        templates: {
            english: `At the end of your turn, Nourish Health to your leader equal to your unspent Money.`,
        },
    },
    tooltips: ['nourishHealing'],
    stats: {},
    effects: ['AneurinBevanTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class AneurinBevan extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AneurinBevan