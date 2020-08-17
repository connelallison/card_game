import TriggerRequirementFactory from "../functionTypes/TriggerRequirementFactory"
import GameEvent from "../gameEvents/GameEvent"
import AttackEvent from "../gameEvents/AttackEvent"
import CardTypeString from "../stringTypes/CardTypeString"
import CardSubtypeString from "../stringTypes/CardSubtypeString"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import DynamicTarget from "../functionTypes/DynamicTarget"
import TriggerEnchantment from "../gameObjects/TriggerEnchantment"

const TriggerRequirements: {[index: string]: TriggerRequirementFactory} = {
    isType: (enchantment: TriggerEnchantment, requiredType: CardTypeString, property: string) => (event: GameEvent) => (event[property].type === requiredType),
    isSubtype: (enchantment: TriggerEnchantment, requiredSubtype: CardSubtypeString, property: string) => (event: GameEvent) => (event[property].subtype === requiredSubtype),
    isFriendly: (enchantment: TriggerEnchantment, property: string) => (event: GameEvent) => (event[property].controller() === enchantment.controller()),
    isMyTurn: (enchantment: TriggerEnchantment) => (event: GameEvent) => (event.turn.activePlayer === enchantment.controller()),
    myLeaderAttacks: (enchantment: TriggerEnchantment) => (event: AttackEvent) => (event.attacker === enchantment.controller().leaderZone[0]),
    canSummonType: (enchantment: TriggerEnchantment, cardType: PersistentCardTypeString) => (event: GameEvent) => (enchantment.controller().canSummonType(cardType)),
    isDynamicTarget: (enchantment: TriggerEnchantment, map, target: DynamicTarget) => (event: GameEvent) => (map(event) === target())
}

export default TriggerRequirements