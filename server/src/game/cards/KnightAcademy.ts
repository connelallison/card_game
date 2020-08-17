import WonderCreation from "../gameObjects/WonderCreation"
import Game from "../gameSystems/Game"
import GamePlayer from "../gameObjects/GamePlayer"
import CreationZoneString from "../stringTypes/CreationZoneString"
import Enchantments from "../dictionaries/Enchantments"

class KnightAcademy extends WonderCreation {
    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString) {
        super(
            game,
            owner,
            zone,
            'KnightAcademy',
            'Knight Academy',
            true,
            3,
            3,
            'After you draw a unit, summon a 2/2 Knight.',
            [],
            [],
            false,
            null,
            null
        )
        this.addEnchantment(new Enchantments.KnightAcademyTrigger(this.game, this))
    }
}

export default KnightAcademy