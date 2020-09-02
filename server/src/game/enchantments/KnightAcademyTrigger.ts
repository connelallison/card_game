import Game from "../gamePhases/Game";
import DrawEvent from "../gameEvents/DrawEvent";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import GameObject from "../gameObjects/GameObject";

class KnightAcademyTrigger extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'KnightAcademyTrigger',
            'Knight Academy Trigger',
            ['creationZone'],
            ['Creation'],
            [],
            true,
            [{
                eventType: 'afterDraw',
                requirements: [
                    {
                        playRequirement: 'canSummonType',
                        values: {
                            type: 'Follower',
                        }
                    },
                    {
                        targetRequirement: 'isType',
                        values: {
                            type: 'Follower',
                        },
                        targetMap: 'drawEventDrawnCard'
                    },
                    {
                        targetRequirement: 'isFriendly',
                        targetMap: 'drawEventDrawnCard'
                    }
                ],
                actions: [{
                    actionType: 'autoAction',
                    operation: 'summonCard',
                    values: {
                        cardID: 'Knight'
                    }
                }]
            }],
            true,
        )
    }
}

export default KnightAcademyTrigger