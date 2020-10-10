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
    repeatable: false,
    staticText: {
        english: `Event: Summon a 2/2 Citizen.`,
    },
    text: {
        templates: {
            english: `Event: Summon a 2/2 Citizen.`,
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
                english: `Event: Summon a 2/2 Citizen.`,
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
            requirements: [{
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