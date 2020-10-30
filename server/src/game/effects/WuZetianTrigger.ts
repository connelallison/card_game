import TriggerEffect, { TriggerEffectData } from "../gameObjects/TriggerEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: TriggerEffectData = {
    id: 'WuZetianTrigger',
    name: {
        english: `Wu Zetian Trigger`,
    },
    type: 'Effect',
    subtype: 'Trigger',
    activeZones: ['legacy'],
    text: {
        templates: {
            english: `Legacy: After you equip a leader, summon this.`,
        },
        dynamicValues: [],
    },
    repeatable: true,
    wonderTrigger: false,
    triggerObjs: [
        {
            actionType: 'triggerAction',
            eventType: 'afterEnterPlay',
            actionSteps: [
                {
                    requirements: [
                        {
                            eventTargetRequirement: 'isType',
                            targetMap: 'enterPlayEventPlayedCard',
                            values: {
                                type: 'Leader',
                            }
                        },
                        {
                            eventTargetRequirement: 'isFriendly',
                            targetMap: 'enterPlayEventPlayedCard',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'resurrect',
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'self',
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class WuZetianTrigger extends TriggerEffect {
    static readonly data: TriggerEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default WuZetianTrigger