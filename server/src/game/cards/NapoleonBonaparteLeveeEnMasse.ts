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
    cost: 1,
    repeatable: false,
    staticText: {
        english: `Event: Summon a 1/1 Citizen.`,
    },
    text: {
        templates: {
            english: `Event: Summon a 1/1 Citizen.`,
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
                english: `Event: Summon a 1/1 Citizen.`,
            },
        },
        actionSteps: [{
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'createAndSummonCard',
                values: {
                    cardID: 'Citizen',
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