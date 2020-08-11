import Creation from "./Creation";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";

class WorkCreation extends Creation {
    subtype: 'work'

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'work', rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        
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