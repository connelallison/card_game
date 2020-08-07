import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Minion from "../gameObjects/Minion";

class SavageWolfTrigger extends TriggerEnchantment {
    constructor(game: Game, owner: Card) {
        super(
            game,
            owner,
            'SavageWolf:Trigger', 
            'Savage Wolf Trigger', 
            ['board'],
            ['minion'],
            [],
            true,
            ['afterDeath'],
            [{
                eventType: ['afterDeath'],
                requirements: [(event) => (event.object instanceof Minion), (event) => (event.controller === this.controller())],
                actions: [(event) => (game.actions.buffMinionAttackAndHealth(1, 1)(this.controller(), this.owner, this.owner as Minion))]
            }]
        )
    }
}

export default SavageWolfTrigger