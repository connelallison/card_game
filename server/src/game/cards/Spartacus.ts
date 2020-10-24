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
    collectable: true,
    cost: 6,
    health: 5,
    leaderTechniqueID: 'SpartacusBrokenChains', 
    successor: 'SpartacusFollower',
    staticText: {
        english: `Successor: "Spartacus"\nEvent: Summon three 2/2 Slaves.`,
    },
    text: {
        templates: {
            english: `Successor: "Spartacus"\nEvent: Summon three 2/2 Slaves.`,
        },
    },
    starter: false,
    events: [{
        actionType: 'eventAction',
        id: 'SpartacusEvent',
        name: { english: 'Spartacus Event' },
        text: { templates: { english: 'Summon three 2/2 Slaves.' } },
        actionSteps: [{
            actionFunctions: [
                {
                    functionType: 'autoAction',
                    operation: 'createAndSummonCard',
                    values: {
                        cardID: 'Slave',
                        number: 3,
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