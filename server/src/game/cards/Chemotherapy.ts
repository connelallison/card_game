import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { DynamicTextValueObject } from '../structs/Localisation';

const fervourTextDamage: DynamicTextValueObject = {
    value: {
        valueType: 'number',
        from: 'fervour',
        base: 2,
    },
    default: 2,
    fervour: true,
}

const fervourTextHealing: DynamicTextValueObject = {
    value: {
        valueType: 'number',
        from: 'fervour',
        base: 6,
    },
    default: 6,
    fervour: true,
}

const data: TechniqueCreationData = {
    id: 'Chemotherapy',
    name: {
        english: `Chemotherapy`,
    },
    type: 'Creation',
    subtype: 'Technique',
    classes: ['Learning'],
    collectable: true,
    repeatable: false,
    cost: 2,
    charges: 3,
    staticText: {
        english: `Action: Deal 2 rot damage. Then, restore 6 Health.`,
    },
    text: {
        templates: {
            english: `Action: Deal $0 rot damage. Then, restore $1 Health.`,
        },
        dynamicValues: [fervourTextDamage, fervourTextHealing],
    },
    tooltips: ['rotDamage'],
    options: [],
    actions: [
        {
            id: 'ChemotherapyAction',
            name: { english: 'Chemotherapy' },
            text: {
                templates: {
                    english: `Action: Deal $0 rot damage. Then, restore $1 Health.`,
                },
                dynamicValues: [fervourTextDamage, fervourTextHealing],
            },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'damage',
                            values: {
                                damage: {
                                    valueType: 'number',
                                    from: 'fervour',
                                    base: 2,
                                },
                                rot: true,
                            },
                        },
                        {
                            functionType: 'manualAction',
                            operation: 'heal',
                            values: {
                                healing: 6,
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a character to damage and heal.' } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['enemyBoard', 'friendlyBoard', 'enemyLeader', 'friendlyLeader'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
}

class Chemotherapy extends TechniqueCreation {
    static readonly data: TechniqueCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Chemotherapy