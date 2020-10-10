import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'JohannesGutenberg',
    name: {
        english: `Johannes Gutenberg`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 4,
    staticText: {
        english: `Eureka: Copy this card's Eurekas onto the first famous follower in your hand.`,
    },
    text: {
        templates: {
            english: `Eureka: Copy this card's Eurekas onto the first famous follower in your hand.`,
        },
    },
    actions: [{
        actionType: 'actionAction',
        id: 'JohannesGutenbergEureka',
        name: {
            english: 'Johannes Gutenberg Eureka'
        },
        text: {
            templates: {
                english: `Eureka: Copy this card's Eurekas onto the first famous follower in your hand.`,
            }
        },
        eureka: true,
        unique: true,
        actionSteps: [{
            autoTargets: [
                {
                    targets: {
                        valueType: "target",
                        from: "targets",
                        targets: {
                            valueType: 'targets',
                            from: 'targetDomain',
                            targetDomain: 'friendlyHand',
                            requirements: [{
                                targetRequirement: 'isSubtype',
                                values: {
                                    subtype: 'Famous',
                                }
                            }]
                        },
                        reducer: 'first'
                    },
                },
            ],
            requirements: [{
                activeRequirement: 'eureka'
            }],
            // activeHighlight: true,
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'copyEurekasToTarget',
            }]
        }]
    }],
}

class JohannesGutenberg extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JohannesGutenberg