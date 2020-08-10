import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import TriggerActionFactory from "../functionTypes/TriggerActionFactory"
import GameEvent from "../gameEvents/GameEvent"
import TriggerEnchantment from "../gameObjects/TriggerEnchantment"
import Actions from "./Actions"

const TriggerActions: {[index: string]: TriggerActionFactory} = {
    buffCharOwnerAttackAndHealth: (attack: number, health: number) => ((event: GameEvent, enchantment: TriggerEnchantment) => {
        Actions.buffCharacterAttackAndHealth(attack, health)(enchantment, enchantment.charOwner())
    })
}

export default TriggerActions