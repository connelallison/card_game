import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'StonewallRioter',
    name: {
        english: `Stonewall Rioter`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Minority'],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 1,
    charges: 2,
    staticText: {
        english: `All your copies of this follower have +2 Health.`,
    },
    text: {
        templates: {
            english: `All your copies of this follower have +2 Health.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['StonewallRioterAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class StonewallRioter extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default StonewallRioter