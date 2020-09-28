import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'BodyDouble',
    name: {
        english: `Body Double`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 3,
    charges: 2,
    staticText: {
        english: `Action: Transform into a clone of a follower.`,
    },
    text: {
        templates: {
            english: `Action: Transform into a clone of a follower.`,
        },
    },
    actions: [{
        actionType: 'actionAction',
        name: {
            english: 'Body Double Action'
        },
        text: {
            templates: {
                english: `Action: Transform into a clone of a follower.`,
            },
        },
        actionSteps: [{
            manualTargets: [{
                targets: {
                    valueType: 'targets',
                    from: 'targetDomain',
                    targetDomain: ['friendlyBoard', 'enemyBoard'],
                },
                text: {
                    templates: {
                        english: `Choose a follower to transform into.`,
                    },
                },
            }],
            actionFunctions: [{
                functionType: 'manualAction',
                operation: 'selfTransform',
            }]
        }]
    }],

}

class BodyDouble extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BodyDouble