const TriggerActions: {[index: string]: TriggerActionFactory} = {
    buffCharOwnerAttackAndHealth: (attack: number, health: number) => ((event: GameEvent, enchantment: TriggerEnchantment) => {
        Actions.buffCharacterAttackAndHealth(attack, health)(enchantment, [enchantment.charOwner()])
    }),
    healFriendlyCharacters: (value: number) => ((event: GameEvent, enchantment: TriggerEnchantment) => {
        Actions.healMultipleCharacters(value)(enchantment, (enchantment.controller().leader as Character[]).concat(enchantment.controller().board))
    }),
    summonSpecificCard: (cardID: string, number: number = 1, friendly: boolean = true) => ((event: GameEvent, enchantment: TriggerEnchantment) => {
        console.log('trigger running')
        Actions.summonCard(cardID, number, friendly)(enchantment)
    })
}

export default TriggerActions

import TriggerEnchantment from "../gameObjects/TriggerEnchantment"
import Character from "../gameObjects/Character"
import TriggerActionFactory from "../functionTypes/TriggerActionFactory"
import GameEvent from "../gameEvents/GameEvent"
import Actions from "./Actions"