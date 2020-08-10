import AuraEnchantment from "../gameObjects/AuraEnchantment";

interface AurasObject {
    stats: {
        minion: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leader: AuraEnchantment[],
        },
        spell: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    },
    flags: {
        minion: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leader: AuraEnchantment[],
        },
        spell: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    }
}

export default AurasObject