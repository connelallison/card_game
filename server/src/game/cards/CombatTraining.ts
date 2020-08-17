import PermanentPassive from "../gameObjects/PermanentPassive";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import PassiveZoneString from "../stringTypes/PassiveZoneString";
import Enchantments from "../dictionaries/Enchantments";

class CombatTraining extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer, zone: PassiveZoneString){
        super(
            game,
            owner,
            zone,
            'CombatTraining',
            'Combat Training',
            true,
            3,
            'Passive: Your Knights have +1 Attack.',
            [],
            [],
            false,
            null,
            null,
        )
        this.addEnchantment(new Enchantments.CombatTrainingAura(this.game, this))
    }
}

export default CombatTraining