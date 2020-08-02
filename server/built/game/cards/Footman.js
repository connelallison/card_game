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
var Minion_1 = require("../gameObjects/Minion");
var Enchantment_1 = require("../gameObjects/Enchantment");
var FootmanExtraDamageDuringYourTurn = /** @class */ (function (_super) {
    __extends(FootmanExtraDamageDuringYourTurn, _super);
    function FootmanExtraDamageDuringYourTurn(game, owner) {
        return _super.call(this, game, owner, 'FootMan:ExtraDamageDuringYourTurn', 'Zeal', ['board'], ['minion'], function (enchantment) { return (enchantment.owner.owner.myTurn()); }, false, 'static', {
            effect: function (stats, value) { return (stats.attack += value); },
            value: 2,
            category: 'stats',
        }) || this;
    }
    return FootmanExtraDamageDuringYourTurn;
}(Enchantment_1.default));
var Footman = /** @class */ (function (_super) {
    __extends(Footman, _super);
    function Footman(game, owner, zone) {
        var _this = _super.call(this, game, owner, zone, 'Footman', 'Footman', 2, 2, 4, 'Has +2 Attack during your turn.', null, false, null, null) || this;
        _this.enchantments.static.stats.push(new FootmanExtraDamageDuringYourTurn(_this.game, _this));
        return _this;
    }
    return Footman;
}(Minion_1.default));
exports.default = Footman;
