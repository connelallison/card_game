import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
  id: 'Triage',
  name: {
    english: `Triage`,
  },
  type: 'Creation',
  subtype: 'Technique',
  classes: ['Learning'],
  collectable: true,
  cost: 2,
  charges: 2,
  staticText: {
    english: `Event: Heal your followers for half their missing Health, plus 2 Health.`,
  },
  text: {
    templates: {
      english: `Event: Heal your followers for half their missing Health, plus 2 Health.`,
    },
  },
  options: [],
  actions: [],
  events: [
      {
            id: 'TriageEvent',
            name: { english: 'Triage' },
            text: { templates: { english: `Event: Heal your followers for half their missing Health` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                  actionFunctions: [
                      {
                        functionType: 'autoAction',
                        operation: 'heal',
                        values: {
                            healing: 2,
                            numberMap: 'missingHealth',
                            scaling: 0.5,
                        },
                      },
                  ],
                  autoTargets: [
                      {
                        targets: {
                            valueType: 'targets',
                            from: 'targetDomain',
                            targetDomain: 'friendlyBoard',
                        }
                      },
                  ],
                },
            ],
      },
  ],
}

class Triage extends TechniqueCreation {
  static readonly data: TechniqueCreationData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Triage