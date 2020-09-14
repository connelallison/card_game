import Follower, { FollowerData } from "./Follower";

export interface NamelessFollowerData extends FollowerData {
    subtype: 'Nameless'
    charges: number
}

abstract class NamelessFollower extends Follower {
    static readonly data: NamelessFollowerData
    readonly data: NamelessFollowerData
    subtype: 'Nameless'
    charges: number

    constructor(game: Game, owner: GamePlayer, data: NamelessFollowerData) {
        super(game, owner, data)
        this.charges = data.charges
    }

    provideReport(localisation: LocalisationString = 'english'): ObjectReport {
        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.attack,
            health: this.health,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            targeted: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText[localisation],
            validSlots: this.validSlotIDs(),
            dynamicCardText: this.generateDynamicCardText(localisation),
        }
    }

    loseCharge() {
        this.charges--
        if (this.charges <= 0 && !this.inPlay()) this.moveZone('setAsideZone')
        this.update()
    }

    setCharges(number: number) {
        this.charges = number
    }

    moveZone(destination: FollowerZoneString, index?: number): void {
        if (this.zone === 'board') {
            this.slot.follower = null
            this.slot = null
            this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        } else if (destination === 'board') {
            const clone = this.clone() as NamelessFollower
            this.owner[this.zone][this.index()] = clone
            clone.zone = this.zone
            clone.loseCharge()
            this.setCharges(1)
        } else {
            this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        }

        if (destination === 'board') {
            const slot = typeof index === 'number' ? this.controller().board[index] : this.controller().firstEmptySlot()
            if (slot instanceof BoardSlot) {
                slot.follower = this
                this.slot = slot
                this.game.inPlay.push(this)
            }
        } else {
            if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
            else this.owner[destination].push(this)
        }
        this.zone = destination
        this.updateEnchantments()
    }

    cloneData(clone) {
        return {
            clonedFrom: this,
            pendingDestroy: this.pendingDestroy,
            rawCost: this.rawCost,
            cost: this.cost,
            rawAttack: this.rawAttack,
            attack: this.attack,
            rawHealth: this.rawHealth,
            health: this.health,
            maxHealth: this.maxHealth,
            charges: this.charges,
            actions: JSON.parse(JSON.stringify(this.actions)),
            events: JSON.parse(JSON.stringify(this.events)),
            enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
            auraEffects: this.auraEffects.splice(0),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }
}

export default NamelessFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { FollowerZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import BoardSlot from "./BoardSlot";
import { ObjectReport } from "../structs/ObjectReport"; import { LocalisationString } from "../structs/Localisation";

