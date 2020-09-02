import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import EventMoment from '../gameObjects/EventMoment'

class BattleOfSuiyang extends EventMoment {
    constructor(game: Game, owner: GamePlayer, zone: MomentZoneString) {
        super(
            game,
            owner,
            zone,
            'BattleOfSuiyang',
            'Battle Of Suiyang',
            true,
            2,
            'Event: Destroy all friendly followers. For each destroyed, give followers in your hand +1/+1.',
            [
                {
                    actionType: 'autoAction',
                    operation: 'storeValue',
                    values: {
                        name: 'targetCount',
                        value: {
                            valueType: 'number',
                            from: 'numbers',
                            reducer: 'count',
                            numbers: {
                                valueType: 'numbers',
                                from: 'targets',
                                numberMap: 'count',
                                targets: {
                                    valueType: 'targets',
                                    from: 'targetDomain',
                                    targetDomain: 'friendlyBoard'
                                },
                            }
                        },
                    },
                },
                {
                    actionType: 'autoAction',
                    operation: 'markDestroyed',
                    targets: 'friendlyBoard',
                },
                {
                    actionType: 'autoAction',
                    operation: 'forceDeathPhase',
                },
                {
                    actionType: 'autoAction',
                    operation: 'buffCharacterAttackAndHealth',
                    stored: {
                        'stats': 'targetCount'
                    },
                    targets: 'friendlyHand',
                }
            ],
            [{
                playRequirement: 'minFriendlyFollowers',
                values: {
                    min: 1,
                }
            }],
            [],
        )
    }
}
export default BattleOfSuiyang