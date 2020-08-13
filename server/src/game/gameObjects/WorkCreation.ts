import Creation from "./Creation";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";
import CreationZoneString from "../stringTypes/CreationZoneString";

abstract class WorkCreation extends Creation {
    subtype: 'Work'

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'Work', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        
        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event: StartOfTurnEvent) {
        if (this.inPlay() && this.controller().myTurn()){
            this.loseCharge()
            this.updateStats()
        }
    }
}

export default WorkCreation