import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
  id: 'Consume',
  name: {
    english: `Consume`,
  },
  type: 'Moment',
  subtype: 'Event',
  classes: ['Infamy'],
  collectable: true,
  cost: 3,
  staticText: {
    english: `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
  },
  text: {
    templates: {
      english: `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
    },
  },
  events: [{
    actionType: 'eventAction',
    id: 'Consume',
    name: {
      english: 'Consume'
    },
    text: {
      templates: {
        english: `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
      },
    },
    actionSteps: [{
      autoTargets: [{
        targets: {
          valueType: 'target',
          from: 'targets',
          'reducer': 'min',
          'criterionMap': 'attack',
          targets: {
            valueType: 'targets',
            from: 'targetDomain',
            targetDomain: 'enemyBoard',
          }
        },
      }],
      actionFunctions: [{
        functionType: 'autoAction',
        operation: 'damage',
        values: {
          'damage': 3,
        },
      },
      {
        functionType: 'autoAction',
        operation: 'draw',
      }]
    }]
  }]
}

class Consume extends EventMoment {
  static readonly data: EventMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Consume