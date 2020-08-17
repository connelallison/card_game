import PermanentPassive from "../gameObjects/PermanentPassive";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import PassiveZoneString from "../stringTypes/PassiveZoneString";
import Enchantments from "../dictionaries/Enchantments";

class HolyProtectors extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer, zone: PassiveZoneString){
        super(
            game,
            owner,
            zone,
            'HolyProtectors',
            'Holy Protectors',
            true,
            4,
            'Passive: Your leader gains (temporary) Health equal to the total Health of your units.',
            [],
            [],
            false,
            null,
            null,
        )
        this.addEnchantment(new Enchantments.HolyProtectorsAura(this.game, this))
    }
}

export default HolyProtectors