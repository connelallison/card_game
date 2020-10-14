import AuraEffect, { AuraEffectData } from "../gameObjects/AuraEffect";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: AuraEffectData = {
    id: 'GeneralStrike1926Aura',
    name: {
        english: `1926 General Strike Aura`,
    },
    type: 'Effect',
    subtype: 'Aura',
    text: {
        templates: {
            english: `Followers can't attack until the end of your next turn.`,
        },
    },
    priority: 1,
    activeZones: 'inPlay',
    effectFunction: {
        name: { english: `1926 General Strike Aura` },
        text: {
            templates: {
                english: `Can't attack.`,
            },
        },
        stackable: false,
        functions: [
            {
              operation: 'cantAttack',
              value: true,
            },
        ],
    },
    targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: ['enemyBoard', 'friendlyBoard'],
    },
    expires: ['ExpiresEndOfMyNextTurn'],
}

class GeneralStrike1926Aura extends AuraEffect {
    static readonly data: AuraEffectData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default GeneralStrike1926Aura