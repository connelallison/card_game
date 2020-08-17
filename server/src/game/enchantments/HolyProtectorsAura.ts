import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Passive from "../gameObjects/Passive";
import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import TargetRequirements from "../dictionaries/TargetRequirements";

class HolyProtectorsAura extends AuraEnchantment {
    owner: Passive

    constructor(game: Game, owner: Card) {
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
                    reducer: 'sum',
                    numberMap: (obj) => obj.health,
                    targetDomain: 'friendlyBoard',
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