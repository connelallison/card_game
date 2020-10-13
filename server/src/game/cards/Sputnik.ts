import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Sputnik',
    name: {
        english: `Sputnik`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Tech'],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 3,
    charges: 1,
    staticText: {
        english: `Event: Both players draw two cards.`,
    },
    text: {
        templates: {
            english: `Event: Both players draw two cards.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'SputnikEvent',
            name: { english: 'Sputnik Event' },
            text: { templates: { english: 'Event: Both players draw two cards.' } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                number: 2,
                                forOpponent: false,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                            values: {
                                number: 2,
                                forOpponent: true,
                            },
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class Sputnik extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Sputnik