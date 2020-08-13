abstract class GameObject {
    game: Game
    owner: GamePlayer | GameObject
    zone: ZoneString
    id: string
    name: string
    type: ObjectTypeString
    subtype: ObjectSubtypeString
    objectID: string
    flags: any
    enchantments: Enchantment[]

    constructor(game: Game, owner: GamePlayer | GameObject, id: string, name: string, type: ObjectTypeString, subtype: ObjectSubtypeString) {
        this.game = game
        this.owner = owner
        this.id = id
        this.name = name
        this.type = type
        this.subtype = subtype
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        this.flags = {}
        this.enchantments = []
    }

    updateFlags(): void {
        const flags = this.baseFlags()

        this.enchantments.forEach(enchantment => {
            if (
                enchantment instanceof StaticEnchantment
                && enchantment.categories.includes('flags')
                && enchantment.active()
            ) {
                enchantment.effects.forEach(effect => {
                    if (effect.category === 'flags') effect.effect(flags, effect.value)
                })
            }
        })

        const auras: AuraEnchantment[] = this.game.auras.auras.flags[this.type][this.zone]
        auras.forEach(enchantment => {
            if (
                enchantment.targetRequirements.every(requirement => requirement(enchantment, this))
                && enchantment.categories.includes('flags')
            ) {
                enchantment.effects.forEach(effect => {
                    if (effect.category === 'flags') effect.effect(flags, effect.value)
                })
            }
        })

        this.flags = flags
    }

    baseFlags() {
        return {}
    }

    addEnchantment(enchantment: Enchantment): void {
        this.enchantments.push(enchantment)
        this.updateEnchantments()
    }

    removeEnchantment(enchantment: Enchantment): void {
        if (enchantment instanceof TriggerEnchantment) enchantment.disableListeners()
        this.enchantments = this.enchantments.filter(item => item !== enchantment)
        this.updateEnchantments()
    }

    updateEnchantments(): void {
        this.enchantments.forEach(enchantment => enchantment.active())
    }

    controller(): GamePlayer {
        return this.owner.controller()
    }

    charOwner(): Character {
        return this.controller().leaderZone[0]
    }
}

export default GameObject

import Game from "../gameSystems/Game"
import GamePlayer from "./GamePlayer"
import TriggerEnchantment from "./TriggerEnchantment"
import Enchantment from "./Enchantment"
import ObjectTypeString from "../stringTypes/ObjectTypeString"
import Character from "./Character"
import ObjectSubtypeString from "../stringTypes/ObjectSubtypeString"
import StaticEnchantment from "./StaticEnchantment"
import AuraEnchantment from "./AuraEnchantment"
import ZoneString from "../stringTypes/ZoneString"

