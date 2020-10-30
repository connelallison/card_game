import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'TupacHologram',
    name: {
        english: `Tupac Hologram`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Underclass', 'Tech'],
    collectable: false,
    cost: 0,
    attack: 0,
    health: 0,
    charges: 1,
    staticText: {
        english: `Death: Summon this.`,
    },
    text: {
        templates: {
            english: `Death: Summon this.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'TupacHologramDeathEvent',
            name: { english: 'Tupac Hologram Death Event' },
            text: { templates: { english: `Death: Summon this.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'summonCards',
                            values: {
                                cards: {
                                    valueType: 'targets',
                                    from: 'targetDomain',
                                    targetDomain: 'self',
                                }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'stored',
                                param: 'deathSlot',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class TupacHologram extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TupacHologram