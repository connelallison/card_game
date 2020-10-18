import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'NapoleonBonaparteLeveeEnMasse',
    name: {
        english: `Leveé en masse`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['The People'],
    collectable: false,
    cost: 2,
    staticText: {
        english: `Event: Summon two 1/1 Citizens.`,
    },
    text: {
        templates: {
            english: `Event: Summon two 1/1 Citizens.`,
        },
    },
    events: [{
        actionType: 'eventAction',
        id: 'NapoleonBonaparteLeveeEnMasseEvent',
        name: {
            english: 'Leveé en masse'
        },
        text: {
            templates: {
                english: `Event: Summon two 1/1 Citizens.`,
            },
        },
        actionSteps: [{
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'createAndSummonCard',
                values: {
                    cardID: 'Citizen',
                    number: 2,
                }
            }],
            activeRequirements: [{
                activeRequirement: 'canSummonType',
                values: {
                    type: 'Follower',
                }
            }],
        }],
    }],
    
}

class NapoleonBonaparteLeveeEnMasse extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NapoleonBonaparteLeveeEnMasse