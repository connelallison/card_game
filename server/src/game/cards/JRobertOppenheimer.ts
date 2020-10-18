import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { freemem } from 'os';

const data: FamousFollowerData = {
    id: 'JRobertOppenheimer',
    name: {
        english: `J. Robert Oppenheimer`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 8,
    attack: 2,
    health: 2,
    staticText: {
        english: `Event: Deal 8 Rot damage to all other followers.`,
    },
    text: {
        templates: {
            english: `Event: Deal 8 Rot damage to all other followers.`,
        },
    },
    tooltips: ['rotDamage'],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'JRobertOppenheimerEvent',
            name: { english: 'J. Robert Oppenheimer Event' },
            text: { templates: { english: `Event: Deal 8 Rot damage to all followers.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'damage',
                          values: {
                              damage: 8,
                              rot: true,
                          },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['enemyBoard', 'friendlyBoard'],
                                requirements: [
                                    {
                                      targetRequirement: 'isNotSelf',
                                    },
                                ],
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class JRobertOppenheimer extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JRobertOppenheimer