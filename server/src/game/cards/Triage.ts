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
  repeatable: false,
  cost: 2,
  charges: 2,
  staticText: {
    english: `Action: Heal your followers for half their missing Health.`,
  },
  text: {
    templates: {
      english: `Action: Heal your followers for half their missing Health.`,
    },
  },
  options: [],
  actions: [
      {
            id: 'TriageAction',
            name: { english: 'Triage' },
            text: { templates: { english: `Action: Heal your followers for half their missing Health` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                  actionFunctions: [
                      {
                        functionType: 'autoAction',
                        operation: 'healRelativeToNumber',
                        values: {
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
  events: [],
}

class Triage extends TechniqueCreation {
  static readonly data: TechniqueCreationData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Triage