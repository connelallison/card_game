import WeaponCreation from "../gameObjects/WeaponCreation";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import CreationZoneString from "../stringTypes/CreationZoneString";
import Enchantments from "../dictionaries/Enchantments";

class ClubOfLooting extends WeaponCreation {
    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString) {
        super(
            game,
            owner,
            zone,
            'ClubOfLooting',
            'Club of Looting',
            true,
            2,
            3,
            3,
            'Your Leader has Pillage.',
            [],
            [],
            false,
            null,
            null
        )
        this.addEnchantment(new Enchantments.Pillage(this.game, this))
    }
}

export default ClubOfLooting