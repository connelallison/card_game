import GameObject from "./GameObject";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import GameObjectData from "../structs/GameObjectData";
import Follower from "./Follower";
import BoardSlotReport from "../structs/BoardSlotReport";

class BoardSlot extends GameObject {
    game: Game
    owner: GamePlayer
    zone: 'board' | 'setAsideZone'
    follower: Follower
    attack: number
    health: number

    constructor(game: Game, owner: GamePlayer, zone: 'board' | 'setAsideZone') {
        super(game, 'BoardSlot', 'Board Slot', 'BoardSlot', 'BoardSlot')
        this.owner = owner
        this.zone = zone
        this.attack = 0
        this.health = 0
        this.follower = null
    }

    baseData(): GameObjectData {
        return {
          flags: this.baseFlags(),
        }
      }

    provideReport(): BoardSlotReport {
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            attack: this.attack,
            health: this.health,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.objectID,
            follower: this.follower ? this.follower.provideReport() : null
          }
    }

    isEmpty(): boolean {
        return this.follower === null
    }

    index(): number {
        return this.controller()[this.zone].indexOf(this)
    }
}

export default BoardSlot