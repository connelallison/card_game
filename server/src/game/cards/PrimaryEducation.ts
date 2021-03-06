import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
  id: 'PrimaryEducation',
  name: {
    english: `Primary Education`,
  },
  type: 'Creation',
  subtype: 'Technique',
  classes: ['Learning'],
  collectable: true,
  cost: 2,
  charges: 1,
  staticText: {
    english: `Action: Give a famous follower in your hand +2/+2 and "Event: Draw a card".`,
  },
  text: {
    templates: {
      english: `Action: Give a famous follower in your hand +2/+2 and "Event: Draw a card".`,
    },
  },
  options: [],
  actions: [
    {
      id: 'PrimaryEducationAction',
      name: { english: 'Primary Education' },
      text: { templates: { english: `Action: Give a famous follower in your hand +2/+2 and "Event: Draw a card".` } },
      actionType: 'actionAction',
      actionSteps: [
        {
          actionFunctions: [
            {
              functionType: 'manualAction',
              operation: 'buffStats',
              values: {
                stats: 2,
                effectName: { english: 'Primary Education Buff' },
              },
            },
            {
              functionType: 'manualAction',
              operation: 'addEventAction',
              values: {
                eventAction: {
                  id: 'PrimaryEducationEvent',
                  name: { english: 'Primary Education Event' },
                  text: { templates: { english: `Event: Draw a card.` } },
                  actionType: 'eventAction',
                  actionSteps: [
                    {
                      actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'draw',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          manualTargets: [
            {
              text: { templates: { english: 'Choose a famous follower in your hand to buff.' } },
              hostile: false,
              targets: {
                valueType: 'targets',
                from: 'targetDomain',
                targetDomain: 'friendlyHand',
                requirements: [
                  {
                    targetRequirement: 'isSubtype',
                    values: {
                      subtype: 'Famous',
                    }
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  events: [],
}

class PrimaryEducation extends TechniqueCreation {
  static readonly data: TechniqueCreationData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default PrimaryEducation