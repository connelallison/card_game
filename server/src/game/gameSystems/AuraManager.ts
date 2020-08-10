import Game from "../Game";
import AuraEnchantment from "../gameObjects/AuraEnchantment";
import ObjectTypeString from "../stringTypes/ObjectTypeString";
import ZoneString from "../stringTypes/ZoneString";
import AurasObject from "../structs/AurasObject";

class AuraManager {
    game: Game
    auras: AurasObject

    constructor(game: Game) {
        this.game = game;
        this.auras = {
            stats: {
                minion: {
                    hand: [],
                    deck: [],
                    board: [],
                },
                leader: {
                    hand: [],
                    deck: [],
                    leader: [],
                },
                spell: {
                    hand: [],
                    deck: [],
                },
            },
            flags: {
                minion: {
                    hand: [],
                    deck: [],
                    board: [],
                },
                leader: {
                    hand: [],
                    deck: [],
                    leader: [],
                },
                spell: {
                    hand: [],
                    deck: [],
                },
            }
        };
    }

    emit(aura: AuraEnchantment) {
        let type: ObjectTypeString
        let zone: ZoneString
        let category: EffectCategoryString
        for (type in aura.targetTypes) {
            for (zone of aura.targetTypes[type]) {
                for (category of aura.categories) {
                    (this.auras[category][type][zone] as AuraEnchantment[]).push(aura)
                }
            }
        }
    }

    cancel(aura: AuraEnchantment) {
        let type: ObjectTypeString
        let zone: ZoneString
        let category: EffectCategoryString
        for (type in aura.targetTypes) {
            for (zone of aura.targetTypes[type]) {
                for (category of aura.categories) {
                    (this.auras[category][type][zone] as AuraEnchantment[]) = (this.auras[category][type][zone] as AuraEnchantment[]).filter(item => item !== aura)
                }
            }
        }
    }
}

export default AuraManager