import TriggerRequirementFactory from "../functionTypes/TriggerRequirementFactory"
import Minion from "../gameObjects/Minion"
import GameEvent from "../gameEvents/GameEvent"

const TriggerRequirements: {[index: string]: TriggerRequirementFactory} = {
    isMinion: (property: string) => (event: GameEvent, enchantment) => (event[property] instanceof Minion),
    isFriendly: (property: string) => (event: GameEvent, enchantment) => (event[property].controller() === enchantment.controller())
}

export default TriggerRequirements