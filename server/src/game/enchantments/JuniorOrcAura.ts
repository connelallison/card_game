import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import Unit from "../gameObjects/Unit";
import TargetRequirements from "../dictionaries/TargetRequirements";

class JuniorOrcAura extends AuraEnchantment {
    owner: Unit

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'JuniorOrcAura',
            'Junior Orc Aura',
            ['board'],
            ['Unit'],
            [],
            [{
                operation: 'incrementAttack',
                value: 1,
            }],
            'friendlyBoard',
            [{ targetRequirement: 'isFriendly' }, { targetRequirement: 'notSelf' }],
            1,
        )
    }
}

export default JuniorOrcAura