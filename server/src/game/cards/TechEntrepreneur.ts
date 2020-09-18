import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'TechEntrepreneur',
    name: {
        english: `Tech Entrepreneur`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Economy'],
    categories: [],
    collectable: false,
    cost: 2,
    attack: 4,
    health: 4,
    charges: 1,
    staticText: {
        english: `Option: Debt 2; or Rent 1.`,
    },
    text: {
        templates: {
            english: `Option: Debt 2; or Rent 1.`,
        },
    },
    options: [{
        actionType: 'optionAction',
        name: { english: 'Tech Entrepreneur Option' },
        text: { templates: { english: 'Option: Debt 2; or Rent 1.' } },
        actions: [
            {
                actionType: 'actionAction',
                name: { english: 'Bootstrap' },
                text: { templates: { english: 'Debt 2' } },
                actionSteps: [{
                    autoTargets: [{
                        targets: {
                            valueType: 'target',
                            from: 'targetDomain',
                            targetDomain: 'self',
                        }
                    }],
                    actionFunctions: [{
                        functionType: 'autoAction',
                        operation: 'addStatEnchantment',
                        values: {
                            statValue: 2,
                            statEnchantmentID: 'Debt',
                        },
                    }]
                }],
            },
            {
                actionType: 'actionAction',
                name: { english: 'Venture Capital' },
                text: { templates: { english: 'Rent 1' } },
                actionSteps: [{
                    autoTargets: [{
                        targets: {
                            valueType: 'target',
                            from: 'targetDomain',
                            targetDomain: 'self',
                        },
                    }],
                    actionFunctions: [{
                        functionType: 'autoAction',
                        operation: 'addEnchantment',
                        values: {
                            statValue: 1,
                            statEnchantmentID: 'Rent',
                        },
                    }]
                }]
            }
        ]
    }]
}

class TechEntrepreneur extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TechEntrepreneur