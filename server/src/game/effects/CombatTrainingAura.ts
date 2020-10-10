import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'CombatTrainingAura',
    name: {
        english: `Combat Training Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: { templates: { english: `Passive: Your Citizens have +1 Attack.` } },
    priority: 1,
    activeZones: 'inPlay',
    activeTypes: 'Persistent',
    effectFunction: {
        name: { english: `Combat Training` },
        text: { templates: { english: `+1 Attack` } },
        functions: [{
            operation: 'incrementAttack',
            value: 1,
        }]
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['friendlyBoard'],
        requirements: [{
            targetRequirement: 'isSpecificCardClass',
            values: {
                'cardID': 'Citizen',
            }
        }]
    },
}

class CombatTrainingAura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default CombatTrainingAura