import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'Spartacus',
    name: {
        english: `Spartacus`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['The People'],
    collectable: false,
    cost: 5,
    health: 5,
    leaderTechniqueID: 'SpartacusSolidarity',
    staticText: {
        english: `Event: Summon two 2/2 Slaves.`,
    },
    text: {
        templates: {
            english: `Event: Summon two 2/2 Slaves.`,
        },
    },
    starter: false,
    events: [{
        actionType: 'eventAction',
        id: 'SpartacusEvent',
        name: { english: 'Spartacus Event' },
        text: { templates: { english: 'Summon two 2/2 Slaves.' } },
        actionSteps: [{
            actionFunctions: [
                {
                    functionType: 'autoAction',
                    operation: 'createAndSummonCard',
                    values: {
                        cardID: 'Slave'
                    },
                },
                {
                    functionType: 'autoAction',
                    operation: 'createAndSummonCard',
                    values: {
                        cardID: 'Slave'
                    },
                },
            ]
        }],
    }],
}

class Spartacus extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Spartacus