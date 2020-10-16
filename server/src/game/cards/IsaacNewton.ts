import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'IsaacNewton',
    name: {
        english: `Isaac Newton`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 4,
    health: 3,
    staticText: {
        english: `Action: Deplete a charge on a creation in play. Add a clone to your hand for each remaining charge.`,
    },
    text: {
        templates: {
            english: `Action: Deplete a charge on a creation in play. Add a clone to your hand for each remaining charge.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'IsaacNewtonAction',
            name: { english: 'Isaac Newton Action' },
            text: { templates: { english: `Action: Deplete a charge on a creation in play. Add a clone to your hand for each remaining charge.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'depleteCharge',
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'createAndStoreClone',
                            values: {
                                number: {
                                    valueType: 'number',
                                    from: 'target',
                                    numberMap: 'charges',
                                    target: {
                                        valueType: 'target',
                                        from: 'manualTarget',
                                        manualTarget: 0,
                                    }
                                }
                            },
                        },
                        {
                          functionType: 'autoAction',
                          operation: 'moveZone',
                          values: {
                              zone: 'hand'
                          },
                        },
                    ],
                    autoTargets: [
                        {
                          targets: {
                              valueType: 'targets',
                              from: 'stored',
                              param: 'clonedCards'
                          },
                          optional: true,
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a creation.' } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['friendlyCreations', 'enemyCreations'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class IsaacNewton extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default IsaacNewton