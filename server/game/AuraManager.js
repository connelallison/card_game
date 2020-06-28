class AuraManager {
    constructor(game) {
        this.game = game;
        this.auras = {
            stats: {
                minion: {
                    board: [],
                    hand: [],
                    deck: [],
                },
                hero: {
                    board: [],
                    hand: [],
                    deck: [],
                    hero: [],
                },
                spell: {
                    board: [],
                    hand: [],
                    deck: [],
                },
            },
            flags: {
                minion: {
                    board: [],
                    hand: [],
                    deck: [],
                },
                hero: {
                    board: [],
                    hand: [],
                    deck: [],
                    hero: [],
                },
                spell: {
                    board: [],
                    hand: [],
                    deck: [],
                },
            }
        };
    }

    emit(auraObject) {
        for (const type in auraObject.effect.types) {
            for (const zone of auraObject.effect.types[type]) {
                // console.log(auraObject.effect.category)
                // console.log(type)
                // console.log(zone)
                this.auras[auraObject.effect.category][type][zone].push(auraObject)
            }
        }
    }

    cancel(auraObject) {
        for (const type in auraObject.effect.types) {
            for (const zone of auraObject.effect.types[type]) {
                this.auras[auraObject.effect.category][type][zone] = this.auras[auraObject.effect.category][type][zone].filter(item => item !== auraObject)
            }
        }
    }
}

module.exports = AuraManager