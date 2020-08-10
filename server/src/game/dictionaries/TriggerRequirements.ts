import TriggerRequirementFactory from "../functionTypes/TriggerRequirementFactory"
import Unit from "../gameObjects/Unit"
import GameEvent from "../gameEvents/GameEvent"

const TriggerRequirements: {[index: string]: TriggerRequirementFactory} = {
    isUnit: (property: string) => (event: GameEvent, enchantment) => (event[property] instanceof Unit),
    isFriendly: (property: string) => (event: GameEvent, enchantment) => (event[property].controller() === enchantment.controller())
}

export default TriggerRequirements