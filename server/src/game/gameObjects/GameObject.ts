import Game from "../Game"
import GamePlayer from "./GamePlayer"

abstract class GameObject {
    game: Game
    owner: GamePlayer | GameObject
    id: string
    name: string
    type: string
    objectID: string
    // flags: any
    enchantments: any

    constructor(game: Game, owner: GamePlayer | GameObject, id: string, name: string, type: string) {
        this.game = game
        this.owner = owner
        this.id = id 
        this.name = name
        this.type = type
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        // this.flags = {}
        this.enchantments = {
            static: {
                stats: [],
                flags: []
            },
            aura: {
                stats: [],
                flags: []
            },
            dynamic: {
                stats: [],
                flags: []
            },
            trigger: {

            }
        }
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

    updateEnchantments(): void {
        for (const effectType in this.enchantments) {
            for (const category in this.enchantments[effectType]) {
                for (const enchantment of this.enchantments[effectType][category]) {
                    enchantment.updateActiveZoneAndType()
                }
            }
        }
    }

    controller(): GamePlayer {
        return this.owner.controller()
    }
}

export default GameObject