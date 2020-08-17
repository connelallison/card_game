import PermanentPassive from "../gameObjects/PermanentPassive";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import PassiveZoneString from "../stringTypes/PassiveZoneString";
import SingleMindedFuryTrigger from "../enchantments/SingleMindedFuryTrigger";

class SingleMindedFury extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer, zone: PassiveZoneString){
        super(
            game,
            owner,
            zone,
            'SingleMindedFury',
            'Single-Minded Fury',
            true,
            4,
            `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources.   `,
            [],
            [],
            false,
            null,
            null,
        )
        this.addEnchantment(new SingleMindedFuryTrigger(this.game, this))
    }
}

export default SingleMindedFury