import PermanentPassive from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
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
            [],
            ['CombatTrainingAura'],
            false,
            null,
            null,
        )
    }
}

export default CombatTraining