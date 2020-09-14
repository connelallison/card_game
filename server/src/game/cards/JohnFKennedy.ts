import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    'id': 'JohnFKennedy',
    'name': {
        'english': `John F. Kennedy`,
    },
    'type': 'Follower',
    'subtype': 'Famous',
    'classes': ['All'],
    'categories': [],
    'collectable': true,
    'cost': 2,
    'attack': 2,
    'health': 2,
    'targeted': false,
    'staticCardText': {
        'english': `Event and Death: Gain +2 Fervour until the end of your turn.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Event and Death: Gain +2 Fervour until the end of your turn.`,
        },
    },
    'events': [{
        actionType: 'eventAction',
        name: {
            english: 'John F. Kennedy Event'
        },
        text: {
            templates: {
                english: 'Event: Gain +2 Fervour until the end of your turn.'
            }
        },
        actionFunctions: [{
            functionType: 'autoAction',
            operation: 'addStatEnchantment',
            values: {
                statEnchantmentID: 'Fervour',
                statValue: 2,
                expires: ['ExpiresEndOfMyTurn']
            },
            target: {
                valueType: 'target',
                from: 'targetDomain',
                targetDomain: 'friendlyPlayer'
            }
        }]}],
    'deathEvents': [{
        actionType: 'deathAction',
        name: {
            english: 'John F. Kennedy Death Event'
        },
        text: {
            templates: {
                english: 'Death: Gain +2 Fervour until the end of your turn.'
            }
        },
        actionFunctions: [{
        functionType: 'autoAction',
        operation: 'addStatEnchantment',
        values: {
            statEnchantmentID: 'Fervour',
            statValue: 2,
            expires: ['ExpiresEndOfMyTurn']
        },
        target: {
            valueType: 'target',
            from: 'targetDomain',
            targetDomain: 'friendlyPlayer'
        }
    }]}],
}

class JohnFKennedy extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JohnFKennedy