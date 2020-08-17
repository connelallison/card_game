import ActiveLeaderAbility from "../gameObjects/ActiveLeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";

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
            [{
                operation: 'summonCard',
                values: {
                    cardID: 'Knight',
                }
            }],
            [{
                playRequirement: 'canSummonType',
                values: {
                    type: 'Unit',
                }
            }],
            false,
            null,
            null,
            false,
        )
    }
}

export default KingFredTheSaintlyRecruit