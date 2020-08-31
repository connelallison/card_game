import AuraEnchantment from "../gameObjects/AuraEnchantment";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import Follower from "../gameObjects/Follower";
import TargetRequirements from "../dictionaries/TargetRequirements";

class JuniorOrcAura extends AuraEnchantment {
    owner: Follower

    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'JuniorOrcAura',
            'Junior Orc Aura',
            ['board'],
            ['Follower'],
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