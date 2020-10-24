import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
    id: 'BanzaiCharge',
    name: {
        english: `Banzai Charge`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Infamy'],
    collectable: true,
    cost: 1,
    charges: 1,
    staticText: {
        english: `Action: Destroy a friendly follower and its opposite.`,
    },
    text: {
        templates: {
            english: `Action: Destroy a friendly follower and its opposite.`,
        },
    },
    options: [],
    actions: [
        {
            id: 'BanzaiChargeAction',
            name: { english: 'BanzaiCharge' },
            text: { templates: { english: `Action: Destroy a friendly follower and its opposite.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'markDestroyed',
                            extraTargets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'oppositeFollower',
                            }
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: `Choose a friendly follower to destroy.` } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyBoard',
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class BanzaiCharge extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BanzaiCharge