import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

class HolyProtectorsAura extends AuraEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'HolyProtectorsAura',
            'Holy Protectors Aura',
            ['passiveZone'],
            ['Passive'],
            [],
            [{
                operation: 'incrementHealth',
                value: {
                    valueType: 'number',
                    from: 'numbers',
                    reducer: 'sum',
                    numbers: {
                        valueType: 'numbers',
                        from: 'targets',
                        numberMap: 'health',
                        targets: {
                            valueType: 'targets',
                            from: 'targetDomain',
                            targetDomain: 'friendlyBoard',
                        }
                    }
                },
            }],
            'friendlyLeader',
            [{
                targetRequirement: "isFriendly",
            }],
            3,
        )
    }
}

export default HolyProtectorsAura