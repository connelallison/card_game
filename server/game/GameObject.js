class GameObject {
    constructor(id, name, type) {
        this.id = id 
        this.name = name
        this.type = type
        this.objectID = `${this.id}:${Math.random()}`
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
}

module.exports = GameObject