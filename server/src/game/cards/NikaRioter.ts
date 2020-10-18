import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'NikaRioter',
    name: {
        english: `Nika Rioter`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 2,
    attack: 2,
    health: 3,
    charges: 2,
    staticText: {
        english: `Mob\nAfter another Nika Rioter enters play, attack it.`,
    },
    text: {
        templates: {
            english: `Mob\nAfter another Nika Rioter enters play, attack it.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Mob', 'NikaRioterTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class NikaRioter extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NikaRioter