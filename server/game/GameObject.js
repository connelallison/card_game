class GameObject {
    constructor(game, owner, id, name, type) {
        this.game = game
        this.owner = owner
        this.id = id 
        this.name = name
        this.type = type
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        this.enchantments = {
            static: {
                stats: [],
                other: []
            },
            aura: {
                stats: [],
                other: []
            },
            dynamic: {
                stats: [],
                other: []
            },
            trigger: {

            }
        }
    }

    updateEnchantments() {
        for (const effectType in this.enchantments) {
            for (const category in this.enchantments[effectType]) {
                for (const enchantment of this.enchantments[effectType][category]) {
                    enchantment.updateActiveZoneAndType()
                }
            }
        }
    }

    controller() {
        return this.owner.controller()
    }
}

module.exports = GameObject