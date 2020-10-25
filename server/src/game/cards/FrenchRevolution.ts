import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
  id: 'FrenchRevolution',
  name: {
    english: `French Revolution`,
  },
  type: 'Moment',
  subtype: 'Event',
  classes: ['The People'],
  collectable: true,
  cost: 4,
  staticText: {
    english: `Event: Set the Health of all followers to 1, and summon two 1/1 Citizens.`,
  },
  text: {
    templates: {
      english: `Event: Set the Health of all followers to 1, and summon two 1/1 Citizens.`,
    },
  },
  tooltips: [],
  events: [
      {
            id: 'FrenchRevolutionEvent',
            name: { english: 'French Revolution' },
            text: { templates: { english: 'Event: Set the Health of all followers to 1, and summon two 1/1 Citizens.' } },
            actionType: 'eventAction',
            actionSteps: [
                {
                  actionFunctions: [
                      {
                        functionType: 'autoAction',
                        operation: 'setHealth',
                        values: {
                            health: 1,
                            effectName: { english: `French Revolution Effect` },
                        },
                      },
                      {
                        functionType: 'autoAction',
                        operation: 'createAndSummonCard',
                        values: {
                            cardID: 'Citizen',
                            number: 2,
                        },
                      },
                  ],
                  autoTargets: [{
                      targets: {
                          valueType: 'targets',
                          from: 'targetDomain',
                          targetDomain: ['enemyBoard', 'friendlyBoard'],
                      }
                  }],
                },
            ],
      },
  ],
}

class FrenchRevolution extends EventMoment {
  static readonly data: EventMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default FrenchRevolution