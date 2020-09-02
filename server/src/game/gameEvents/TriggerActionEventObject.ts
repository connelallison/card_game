import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import GameEvent from "./GameEvent";
import TriggerAction from "../functionTypes/TriggerAction";
import TriggerActionObject from "../structs/TriggerActionObject";

interface TriggerActionEventObject {
    controller: GamePlayer,
    objectSource: TriggerEnchantment
    targets: Card[]
    event: GameEvent
    action: TriggerActionObject[]

}

export default TriggerActionEventObject