import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerActionEventObject from "./TriggerActionEventObject";
import TriggerAction from "../functionTypes/TriggerAction";

class TriggerActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: TriggerEnchantment
    targets: Card[]
    event: GameEvent
    actions: TriggerAction[]

    constructor(game: Game, object: TriggerActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s trigger action activates${targets}.`
    }
}

export default TriggerActionEvent