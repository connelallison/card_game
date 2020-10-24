import Leader, { LeaderData } from "../gameObjects/Leader";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: LeaderData = {
    id: 'HenryVIII',
    name: {
        english: `Henry VIII`,
    },
    type: 'Leader',
    subtype: 'Leader',
    classes: ['Infamy'],
    collectable: true,
    starter: false,
    cost: 4,
    health: 5,
    leaderTechniqueID: 'HenryVIIIMoreWivesYourGrace',
    staticText: {
        english: `Event: Summon Catherine of Aragon.`,
    },
    text: {
        templates: {
            english: `Event: Summon Catherine of Aragon.`,
        },
    },
    events: [
        {
              id: 'HenryVIIIEvent',
              name: { english: 'Henry VIII Event' },
              text: { templates: { english: `Event: Summon Catherine of Aragon.` } },
              actionType: 'eventAction',
              actionSteps: [
                  {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'createAndSummonCard',
                          values: {
                              cardID: 'CatherineOfAragon',
                          },
                        },
                    ],
                  },
              ],
        },
    ],
}

class HenryVIII extends Leader {
    static readonly data: LeaderData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HenryVIII