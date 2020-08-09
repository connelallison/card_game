import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Game from "../Game";
import Card from "../gameObjects/Card";
import Minion from "../gameObjects/Minion";
import DeathEvent from "../gameSystems/DeathEvent";
import Actions from "../libraries/Actions";

class SavageWolfTrigger extends TriggerEnchantment {
    owner: Minion

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
                eventType: 'afterDeath',
                requirements: [(event: DeathEvent) => (event.object instanceof Minion), (event: DeathEvent) => (event.controller === this.controller())],
                actions: [(event) => {Actions.buffMinionAttackAndHealth(1, 1)(this.controller(), this, this.owner, this.owner)}]
            }]
        )
    }
}

export default SavageWolfTrigger