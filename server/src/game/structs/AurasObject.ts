import AuraEnchantment from "../gameObjects/AuraEnchantment"
// console.log(AuraEnchantment)

interface AurasObject {
    stats: {
        Unit: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        Leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leaderZone: AuraEnchantment[],
        },
        LeaderAbility: {
            leaderAbilityZone: AuraEnchantment[],
        },
        Creation: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            creationZone: AuraEnchantment[],
        },
        Moment: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    },
    flags: {
        Unit: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            board: AuraEnchantment[],
        },
        Leader: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            leaderZone: AuraEnchantment[],
        },
        LeaderAbility: {
            leaderAbilityZone: AuraEnchantment[],
        },
        Creation: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
            creationZone: AuraEnchantment[],
        },
        Moment: {
            hand: AuraEnchantment[],
            deck: AuraEnchantment[],
        },
    }
}

export default AurasObject