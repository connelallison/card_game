import Game from "../Game";
import AuraEnchantment from "../gameObjects/AuraEnchantment";

class AuraManager {
    game: Game
    auras: any

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
        for (const type in aura.targetTypes) {
            for (const zone of aura.targetTypes[type]) {
                // console.log(aura.effect.category)
                // console.log(type)
                // console.log(zone)
                for (const category of aura.categories) {
                    this.auras[category][type][zone].push(aura)
                }
            }
        }
    }

    cancel(aura: AuraEnchantment) {
        for (const type in aura.targetTypes) {
            for (const zone of aura.targetTypes[type]) {
                for (const category of aura.categories) {
                    this.auras[category][type][zone] = this.auras[category][type][zone].filter(item => item !== aura)
                }
            }
        }
    }
}

export default AuraManager