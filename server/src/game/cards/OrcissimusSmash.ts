import ActiveLeaderAbility from "../gameObjects/ActiveLeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import Actions from "../dictionaries/Actions";
import PlayRequirements from "../dictionaries/PlayRequirements";

class OrcissimusSmash extends ActiveLeaderAbility {
    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString) {
        super(
            game,
            owner,
            zone,
            'OrcissimushSmash',
            'Smash',
            2,
            'Deal 2 damage to a unit.',
            [Actions.damageChosenTarget(2)],
            [PlayRequirements.minAllUnits(1)],
            true,
            game.utils.targetDomain(['enemyUnits', 'friendlyUnits',]),
            [],
            false,
        )
    }
}

export default OrcissimusSmash