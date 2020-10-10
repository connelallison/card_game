import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import { lastEnemyFollowerEnteredPlay } from "../dictionaries/DynamicValueShortcuts";

const data: TriggerEffectData = {
    id: 'SingleMindFuryTrigger',
    name: {
        english: `Single-Minded Fury Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    text: {
        templates: {
            english: `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources. $0`,
        },
        dynamicValues: [
            {
                value: {
                    valueType: 'localisedString',
                    from: "target",
                    stringMap: "name",
                    target: lastEnemyFollowerEnteredPlay,
                },
                activeZones: 'inPlay',
                default: '',
                templates: {
                    english: '($)'
                }
            }
        ]
    },
    activeZones: 'inPlay',
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [{
        actionType: 'triggerAction',
        eventType: 'beforeDamage',
        actionSteps: [{
            requirements: [{
                targetMap: 'damageEventDamagedTarget',
                eventTargetRequirement: 'isDynamicTarget',
                values: {
                    dynamicTarget: lastEnemyFollowerEnteredPlay
                }
            }],
            actionFunctions: [{
                functionType: 'eventModAction',
                operation: 'incrementNumberParam',
                values: {
                    param: 'damage',
                    value: 1
                }
            }]
        }]
    }]
}

class SingleMindedFuryTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default SingleMindedFuryTrigger