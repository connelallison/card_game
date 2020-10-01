import GameObject from "./GameObject";

class BoardSlot extends GameObject {
    game: Game
    owner: GamePlayer
    zone: 'board' | 'setAsideZone'
    follower: Follower
    attack: number
    health: number

    constructor(game: Game, owner: GamePlayer, zone: 'board' | 'setAsideZone') {
        super(game, 'BoardSlot', { english: 'Board Slot' }, 'BoardSlot', 'BoardSlot')
        this.owner = owner
        this.zone = zone
        this.attack = 0
        this.health = 0
        this.follower = null
    }

    baseData(): GameObjectData {
        return {
            attack: 0,
            health: 0,
            flags: this.baseFlags(),
        }
    }

    provideReport(localisation: LocalisationString = 'english'): BoardSlotReport {
        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            attack: this.attack,
            health: this.health,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.playerName,
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

    leftSlot(): BoardSlot {
        if (this.zone === 'board') {
            const slot = this.controller().board[this.index() - 1]
            return slot !== undefined ? slot : null
        }
        return null
    }

    rightSlot(): BoardSlot {
        if (this.zone === 'board') {
            const slot = this.controller().board[this.index() + 1]
            return slot !== undefined ? slot : null
        }
        return null
    }

    oppositeSlot(): BoardSlot {
        if (this.zone === 'board') {
            const slot = this.controller().opponent.board[this.index()]
            return slot !== undefined ? slot : null
        }
        return null
    }

    adjacentSlots(): BoardSlot[] {
        const adjacentSlots = []
        const leftSlot = this.leftSlot()
        if (leftSlot) adjacentSlots.push(leftSlot)
        const rightSlot = this.rightSlot()
        if (rightSlot) adjacentSlots.push(rightSlot)
        return adjacentSlots
    }

    neighbouringSlots(): BoardSlot[] {
        const neighbouringSlots = this.adjacentSlots()
        const oppositeSlot = this.oppositeSlot()
        if (oppositeSlot) neighbouringSlots.push(oppositeSlot)
        return neighbouringSlots
    }

    leftFollower(): Follower {
        if (this.zone === 'board') {
            return this.leftSlot() && this.leftSlot().follower
        }
        return null
    }

    rightFollower(): Follower {
        if (this.zone === 'board') {
            return this.rightSlot() && this.rightSlot().follower
        }
        return null
    }

    oppositeFollower(): Follower {
        if (this.zone === 'board') {
            return this.oppositeSlot() && this.oppositeSlot().follower
        }
        return null
    }

    adjacentFollowers(): Follower[] {
        const adjacentFollowers = []
        const leftFollower = this.leftFollower()
        if (leftFollower) adjacentFollowers.push(leftFollower)
        const rightFollower = this.rightFollower()
        if (rightFollower) adjacentFollowers.push(rightFollower)
        return adjacentFollowers
    }

    neighbouringFollowers(): Follower[] {
        const neighbouringFollowers = this.adjacentFollowers()
        const oppositeFollower = this.oppositeFollower()
        if (oppositeFollower) neighbouringFollowers.push(oppositeFollower)
        return neighbouringFollowers
    }

    nearestEmptySlot(): BoardSlot {
        if (this.zone !== 'board') return null
        let rightmostSlot = this.rightSlot()
        let leftmostSlot = this.leftSlot()
        const queue: BoardSlot[] = [this]
        while (rightmostSlot || leftmostSlot) {
            if (rightmostSlot) {
                queue.push(rightmostSlot)
                rightmostSlot = rightmostSlot.rightSlot()
            }
            if (leftmostSlot) {
                queue.push(leftmostSlot)
                leftmostSlot = leftmostSlot.leftSlot()
            }
        }
        for (const slot of queue) {
            if (slot.isEmpty()) return slot
        }
        return null
    }
}

export default BoardSlot

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import GameObjectData from "../structs/GameObjectData";
import Follower from "./Follower";
import { BoardSlotReport } from "../structs/ObjectReport";
import { LocalisationString } from "../structs/Localisation";
