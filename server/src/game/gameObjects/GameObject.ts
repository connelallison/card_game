import Game from "../Game"
import GamePlayer from "./GamePlayer"

abstract class GameObject {
    game: Game
    owner: GamePlayer | GameObject
    id: string
    name: string
    type: ObjectTypeString
    objectID: string
    // flags: any
    enchantments: Enchantment[]

    constructor(game: Game, owner: GamePlayer | GameObject, id: string, name: string, type: ObjectTypeString) {
        this.game = game
        this.owner = owner
        this.id = id 
        this.name = name
        this.type = type
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        // this.flags = {}
        this.enchantments = []
    }

    // updateFlags() {
    //     const flags = {
    
    //     }
    
    //     this.enchantments.static.flags.forEach(enchantment => {
    //       if (enchantment.effectActive()) enchantment.effect.effect(flags, enchantment.effect.value)
    //     })
    
    //     this.game.auras.auras.flags[this.type][this.zone].forEach(enchantment => {
    //       if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(flags, enchantment.effect.value)
    //     })
    
    //     this.flags = flags
    // }

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
}

export default GameObject

import Enchantment from "./Enchantment"
import TriggerEnchantment from "./TriggerEnchantment"
import ObjectTypeString from "../interfaces/ObjectTypeString"

