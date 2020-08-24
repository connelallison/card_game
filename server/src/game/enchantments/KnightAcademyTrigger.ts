import Game from "../gameSystems/Game";
import WonderTriggerEnchantment from "../gameObjects/WonderTriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import WonderCreation from "../gameObjects/WonderCreation";
import DrawEvent from "../gameEvents/DrawEvent";

class KnightAcademyTrigger extends WonderTriggerEnchantment {
    owner: WonderCreation

    constructor(game: Game, owner: WonderCreation) {
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
                        eventMap: (event: DrawEvent) => event.card
                    },
                    {
                        targetRequirement: 'isFriendly',
                        eventMap: (event: DrawEvent) => event.card
                    }
                ],
                actions: [{
                    operation: 'summonCard',
                    values: {
                        cardID: 'Knight'
                    }
                }]
            }]
        )
    }
}

export default KnightAcademyTrigger