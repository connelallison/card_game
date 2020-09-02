import GamePlayer from "../gameObjects/GamePlayer";
import GameEvent from "./GameEvent";
import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Card from "../gameObjects/Card";
import TriggerAction from "../functionTypes/TriggerAction";

interface TriggerEventObject {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actions: TriggerAction[]
    objectSource: TriggerEnchantment
    cardSource: Card | GamePlayer
}

export default TriggerEventObject