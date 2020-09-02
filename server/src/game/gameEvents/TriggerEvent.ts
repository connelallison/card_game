import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Card from "../gameObjects/Card";
import TriggerEventObject from "./TriggerEventObject";
import TriggerAction from "../functionTypes/TriggerAction";

class TriggerEvent extends GameEvent {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actions: TriggerAction[]
    objectSource: TriggerEnchantment
    cardSource: Card | GamePlayer

    constructor(game: Game, object: TriggerEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.cardSource.name}'s ${this.objectSource.name} triggers from the ${this.triggerType} event.`
    }
}

export default TriggerEvent