import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WorkCreationData = {
    id: 'LesMiserables',
    name: {
        english: `Les Misérables`,
    },
    type: 'Creation',
    subtype: 'Work',
    classes: ['The People'],
    collectable: true,
    cost: 2,
    charges: 3,
    staticText: {
        english: `After a friendly follower dies during your opponent's turn, gain Fervour 2.`,
    },
    text: {
        templates: {
            english: `After a friendly follower dies during your opponent's turn, gain Fervour 2. $0`,
        },
        dynamicValues: [
            {
                value: {
                    valueType: 'number',
                    from: 'target',
                    target: {
                        valueType: 'target',
                        from: 'targetDomain',
                        targetDomain: 'self',
                    },
                    numberMap: 'fervour',
                },
                default: '',
                templates: {
                    english: '(Fervour $)'
                }
            }
        ]
    },
    effects: ['LesMiserablesTrigger'],
}

class LesMiserables extends WorkCreation {
    static readonly data: WorkCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default LesMiserables