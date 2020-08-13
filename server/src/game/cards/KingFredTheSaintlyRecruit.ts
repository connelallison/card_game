import ActiveLeaderAbility from "../gameObjects/ActiveLeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import Actions from "../dictionaries/Actions";
import PlayRequirements from "../dictionaries/PlayRequirements";

class KingFredTheSaintlyRecruit extends ActiveLeaderAbility {
    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString) {
        super(
            game,
            owner,
            zone,
            'KingFredTheSaintlyRecruit',
            'Recruit',
            2,
            'Summon a 2/2 Knight.',
            [Actions.summonCard('Knight')],
            [PlayRequirements.canSummonType('Unit')],
            false,
            null,
            null,
            false,
        )
    }
}

export default KingFredTheSaintlyRecruit