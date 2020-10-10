import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";
import { sumFriendlyFollowersHealth } from "../dictionaries/DynamicValueShortcuts";

const data: AuraEffectData = {
    id: 'TulipManiaAura',
    name: {
        english: `Tulip Mania Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Passive: Your leader gains (temporary) Health equal to the total Health of your followers. $0`,
        },
        dynamicValues: [
            {
                value: sumFriendlyFollowersHealth,
                activeZones: 'inPlay',
                default: '',
                templates: {
                    english: '(+$ Health)'
                },
                requirements: [{
                    activeRequirement: 'charOwnerAlive',
                }]
            }
        ]
    },
    priority: 3,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `Holy Protectors Aura` },
        text: {
            templates: {
                english: `$0`,
            },
            dynamicValues: [
                {
                    value: sumFriendlyFollowersHealth,
                    activeZones: ['leaderZone'],
                    // default: {
                    //     english: '+0 Health'
                    // },
                    default: '',
                    templates: {
                        english: '+$ Health'
                    },
                    requirements: [{
                        activeRequirement: 'charOwnerAlive',
                    }]
                }
            ]
        },
        functions: [{
            operation: 'incrementHealth',
            value: sumFriendlyFollowersHealth
        }],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyLeader'],
    }
}

class TulipManiaAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default TulipManiaAura