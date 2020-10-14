import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'SubprimeBorrower',
    name: {
        english: `Subprime Borrower`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 1,
    attack: 3,
    health: 2,
    charges: 2,
    staticText: {
        english: `At the start of your turn, gain Rent 1.`,
    },
    text: {
        templates: {
            english: `At the start of your turn, gain Rent 1.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['SubprimeBorrowerTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class SubprimeBorrower extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SubprimeBorrower