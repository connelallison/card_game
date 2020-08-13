import TriggerRequirementFactory from "../functionTypes/TriggerRequirementFactory"
import GameEvent from "../gameEvents/GameEvent"
import AttackEvent from "../gameEvents/AttackEvent"
import CardTypeString from "../stringTypes/CardTypeString"
import CardSubtypeString from "../stringTypes/CardSubtypeString"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"

const TriggerRequirements: {[index: string]: TriggerRequirementFactory} = {
    isType: (requiredType: CardTypeString, property: string) => (event: GameEvent, enchantment) => (event[property].type === requiredType),
    isSubype: (requiredSubtype: CardSubtypeString, property: string) => (event: GameEvent, enchantment) => (event[property].subtype === requiredSubtype),
    isFriendly: (property: string) => (event: GameEvent, enchantment) => (event[property].controller() === enchantment.controller()),
    isMyTurn: () => (event: GameEvent, enchantment) => (event.turn.activePlayer === enchantment.controller()),
    myLeaderAttacks: () => (event: AttackEvent, enchantment) => (event.attacker === enchantment.controller().leaderZone[0]),
    canSummonType: (cardType: PersistentCardTypeString) => (event: GameEvent, enchantment) => (enchantment.controller().canSummonType(cardType)),
}

export default TriggerRequirements