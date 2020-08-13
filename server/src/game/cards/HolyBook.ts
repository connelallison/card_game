import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import WorkCreation from "../gameObjects/WorkCreation";
import CreationZoneString from "../stringTypes/CreationZoneString";
import Enchantments from "../dictionaries/Enchantments";

class HolyBook extends WorkCreation {
    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString) {
        super(
            game,
            owner,
            zone,
            'HolyBook',
            'Holy Book',
            true,
            2,
            3,
            'At the end of your turn, restore 2 Health to all friendly characters.',
            [],
            [],
            false,
            null,
            null
        )
        this.addEnchantment(new Enchantments.HolyBookHealing(this.game, this))
    }
}

export default HolyBook