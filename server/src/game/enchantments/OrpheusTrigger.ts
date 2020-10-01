import TriggerEnchantment, { TriggerEnchantmentData } from "../gameObjects/TriggerEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEnchantmentData = {
    id: 'OrpheusTrigger',
    name: {
        english: `Orpheus Trigger`,
    },
    type: 'Enchantment',
    subtype: 'Trigger',
    activeTypes: ['Follower'],
    activeZones: ['board'],
    repeatable: false,
    wonderTrigger: false,
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'startOfTurn',
        actionSteps: [{
            requirements: [{
                activeRequirement: 'isMyTurn'
            }],
            autoTargets: [{
                targets: {
                    valueType: 'target',
                    from: 'memory',
                    param: 'target',
                },
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'resurrect',
            }]
        }]
    }]
}

class OrpheusTrigger extends TriggerEnchantment {
    static readonly data: TriggerEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default OrpheusTrigger