import Game from "./Game";
import AurasObject from "../structs/AurasObject";

class AuraManager {
    game: Game
    auras: AurasObject

    constructor(game: Game) {
        this.game = game;
        this.auras = {
            stats: {
                unit: {
                    hand: [],
                    deck: [],
                    board: [],
                },
                leader: {
                    hand: [],
                    deck: [],
                    leader: [],
                },
                creation: {
                    hand: [],
                    deck: [],
                    creations: [],
                },
                moment: {
                    hand: [],
                    deck: [],
                },
            },
            flags: {
                unit: {
                    hand: [],
                    deck: [],
                    board: [],
                },
                leader: {
                    hand: [],
                    deck: [],
                    leader: [],
                },
                creation: {
                    hand: [],
                    deck: [],
                    creations: [],
                },
                moment: {
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

import AuraEnchantment from "../gameObjects/AuraEnchantment";
import ObjectTypeString from "../stringTypes/ObjectTypeString";
import ZoneString from "../stringTypes/ZoneString";
import EffectCategoryString from "../stringTypes/EffectCategoryString";