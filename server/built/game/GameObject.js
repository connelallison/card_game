"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject(game, owner, id, name, type) {
        this.game = game;
        this.owner = owner;
        this.id = id;
        this.name = name;
        this.type = type;
        this.objectID = this.id + ":" + Math.random();
        this.game.gameObjects[this.objectID] = this;
        // this.flags = {}
        this.enchantments = {
            static: {
                stats: [],
                flags: []
            },
            aura: {
                stats: [],
                flags: []
            },
            dynamic: {
                stats: [],
                flags: []
            },
            trigger: {}
        };
    }
    // updateFlags() {
    //     const flags = {
    //     }
    //     this.enchantments.static.flags.forEach(enchantment => {
    //       if (enchantment.effectActive()) enchantment.effect.effect(flags, enchantment.effect.value)
    //     })
    //     this.game.auras.auras.flags[this.type][this.zone].forEach(enchantment => {
    //       if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(flags, enchantment.effect.value)
    //     })
    //     this.flags = flags
    // }
    GameObject.prototype.updateEnchantments = function () {
        for (var effectType in this.enchantments) {
            for (var category in this.enchantments[effectType]) {
                for (var _i = 0, _a = this.enchantments[effectType][category]; _i < _a.length; _i++) {
                    var enchantment = _a[_i];
                    enchantment.updateActiveZoneAndType();
                }
            }
        }
    };
    GameObject.prototype.controller = function () {
        return this.owner.controller();
    };
    return GameObject;
}());
exports.default = GameObject;
