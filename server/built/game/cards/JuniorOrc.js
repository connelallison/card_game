"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Minion_1 = require("../Minion");
var Enchantment_1 = require("../Enchantment");
var JuniorOrcDamageAura = /** @class */ (function (_super) {
    __extends(JuniorOrcDamageAura, _super);
    function JuniorOrcDamageAura(game, owner) {
        return _super.call(this, game, owner, 'JuniorOrc:DamageAura', 'Fury', ['board'], ['minion'], function (enchantment) { return (true); }, true, 'static', {
            effect: function (stats, value) { return (stats.attack += value); },
            value: 1,
            category: 'stats',
            types: {
                minion: ['board'],
            },
            targetRequirement: function (target, source) { return (source.owner.owner === target.owner && source.owner !== target); }
        }) || this;
    }
    return JuniorOrcDamageAura;
}(Enchantment_1.default));
var JuniorOrc = /** @class */ (function (_super) {
    __extends(JuniorOrc, _super);
    function JuniorOrc(game, owner, zone) {
        var _this = _super.call(this, game, owner, zone, 'JuniorOrc', 'Junior Orc', 2, 3, 3, 'Your other minions have +1 Attack.', null, false, null, null) || this;
        _this.enchantments.aura.stats.push(new JuniorOrcDamageAura(_this.game, _this));
        return _this;
    }
    return JuniorOrc;
}(Minion_1.default));
exports.default = JuniorOrc;
