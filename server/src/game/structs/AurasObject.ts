import AuraEnchantment from "../gameObjects/AuraEnchantment"
// console.log(AuraEnchantment)

interface AurasObject {
    stats: {
        unit: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leader: AuraEnchantment[],
        },
        creation: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            creations: AuraEnchantment[],
        },
        spell: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    },
    flags: {
        unit: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leader: AuraEnchantment[],
        },
        creation: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            creations: AuraEnchantment[],
        },
        spell: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    }
}

export default AurasObject