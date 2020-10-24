import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
    id: 'MonasticRetreat',
    name: {
        english: `Monastic Retreat`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Learning'],
    collectable: true,
    cost: 1,
    charges: 1,
    staticText: {
        english: `Action: Restore a follower to full health and return it to its owner's hand.`,
    },
    text: {
        templates: {
            english: `Action: Restore a follower to full health and return it to its owner's hand.`,
        },
    },
    options: [],
    actions: [
        {
            id: 'MonasticRetreatAction',
            name: { english: 'Monastic Retreat' },
            text: { templates: { english: `Action: Restore a follower to full health and return it to its owner's hand.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'heal',
                            values: {
                                numberMap: 'missingHealth'
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'moveZone',
                            values: {
                                zone: 'hand',
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: `Choose a follower to heal and return to its owner's hand.` } },
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
}

class MonasticRetreat extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MonasticRetreat