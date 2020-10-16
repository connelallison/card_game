import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'DavidHumeOrganiseThoughts',
    name: {
        english: `Organise Thoughts`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Learning'],
    collectable: false,
    cost: 1,
    staticText: {
        english: `Action: Shuffle a card in your hand into your deck. At the end of your turn, draw it.`,
    },
    text: {
        templates: {
            english: `Action: Shuffle a card in your hand into your deck. At the end of your turn, draw it.`,
        },
    },
    tooltips: [],
    options: [],
    actions: [
        {
              id: 'DavidHumeOrganiseThoughtsAction',
              name: { english: 'Organise Thoughts' },
              text: { templates: { english: 'Shuffle a card in your hand into your deck. At the end of your turn, draw it.' } },
              actionType: 'actionAction',
              actionSteps: [
                  {
                    actionFunctions: [
                        {
                          functionType: 'manualAction',
                          operation: 'shuffleIntoDeck',
                        },
                        {
                          functionType: 'manualAction',
                          operation: 'addEffect',
                          values: {
                              effectID: 'DavidHumeOrganiseThoughtsTrigger'
                          },
                        },
                    ],
                    manualTargets: [
                        {
                          text: { templates: { english: 'Choose a target to shuffle into your deck.' } },
                          hostile: false,
                          targets: {
                              valueType: 'targets',
                              from: 'targetDomain',
                              targetDomain: 'friendlyHand',
                          },
                        }
                    ],
                  }
              ],
        }
    ],
    events: [],
    effects: [],
}

class DavidHumeOrganiseThoughts extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default DavidHumeOrganiseThoughts