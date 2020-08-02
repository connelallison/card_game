"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuraManager = /** @class */ (function () {
    function AuraManager(game) {
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
    AuraManager.prototype.emit = function (auraObject) {
        for (var type in auraObject.effect.types) {
            for (var _i = 0, _a = auraObject.effect.types[type]; _i < _a.length; _i++) {
                var zone = _a[_i];
                // console.log(auraObject.effect.category)
                // console.log(type)
                // console.log(zone)
                this.auras[auraObject.effect.category][type][zone].push(auraObject);
            }
        }
    };
    AuraManager.prototype.cancel = function (auraObject) {
        for (var type in auraObject.effect.types) {
            for (var _i = 0, _a = auraObject.effect.types[type]; _i < _a.length; _i++) {
                var zone = _a[_i];
                this.auras[auraObject.effect.category][type][zone] = this.auras[auraObject.effect.category][type][zone].filter(function (item) { return item !== auraObject; });
            }
        }
    };
    return AuraManager;
}());
exports.default = AuraManager;
