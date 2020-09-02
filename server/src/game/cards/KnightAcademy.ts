import WonderCreation from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game"
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
            2,
            3,
            'After you draw a follower, summon a 2/2 Knight.',
            [],
            [],
            ['KnightAcademyTrigger'],
            false,
            null,
            null
        )
    }
}

export default KnightAcademy