import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'FranklinRooseveltPublicWorks',
    name: {
        english: `Public Works`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Economy'],
    collectable: false,
    cost: 2,
    staticText: {
        english: `Action: Give a follower +1/+2.`,
    },
    text: {
        templates: {
            english: `Action: Give a follower +1/+2.`,
        },
    },
    tooltips: [],
    options: [],
    actions: [
        {
            id: 'FranklinRooseveltPublicWorksAction',
            name: { english: 'Public Works' },
            text: { templates: { english: `Action: Give a follower +1/+2.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'buffAttackAndHealth',
                            values: {
                                attack: 1,
                                health: 2,
                                effectName: { english: 'Public Works Buff' },
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: `Choose a follower to buff.` } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyBoard', 'enemyBoard'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    effects: [],
}

class FranklinRooseveltPublicWorks extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default FranklinRooseveltPublicWorks