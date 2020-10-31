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
    cost: 1,
    staticText: {
        english: `Action: Give a follower +1/+1.`,
    },
    text: {
        templates: {
            english: `Action: Give a follower +1/+1.`,
        },
    },
    tooltips: [],
    options: [],
    actions: [
        {
            id: 'FranklinRooseveltPublicWorksAction',
            name: { english: 'Public Works' },
            text: { templates: { english: `Action: Give a follower +1/+1.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'buffAttackAndHealth',
                            values: {
                                attack: 1,
                                health: 1,
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