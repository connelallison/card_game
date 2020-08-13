import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import CardSubtypeString from "../stringTypes/CardSubtypeString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import StaticEnchantment from "./StaticEnchantment";
import AuraEnchantment from "./AuraEnchantment";
import PersistentCard from "./PersistentCard";
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString";

abstract class DestroyableCard extends PersistentCard {
    rawHealth: number
    health: number

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: PersistentCardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[],  targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, type, subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.rawHealth = rawHealth
    }

    updateStats(): void {
        const stats = this.baseStats()

        this.enchantments.forEach(enchantment => {
            if (
                enchantment instanceof StaticEnchantment
                && enchantment.categories.includes('stats')
                && enchantment.active()
            ) {
                enchantment.effects.forEach(effect => {
                    if (effect.category === 'stats') effect.effect(stats, effect.value)
                })
            }
        })

        const auras: AuraEnchantment[] = this.game.auras.auras.stats[this.type][this.zone]
        auras.forEach(enchantment => {
            if (
                enchantment.targetRequirements.every(requirement => requirement(enchantment, this))
                && enchantment.categories.includes('stats')
            ) {
                enchantment.effects.forEach(effect => {
                    if (effect.category === 'stats') effect.effect(stats, effect.value)
                })
            }
        })

        this.setStats(stats)
    }

    abstract baseStats()
    abstract setStats(stats): void
}

export default DestroyableCard