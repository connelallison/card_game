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
var RoyalGuardTaunt = /** @class */ (function (_super) {
    __extends(RoyalGuardTaunt, _super);
    function RoyalGuardTaunt(game, owner) {
        return _super.call(this, game, owner, 'RoyalGuard:Taunt', 'Taunt', ['board'], ['minion'], function (enchantment) { return true; }, false, 'static', {
            effect: function (flags) { return (flags.taunt = true); },
            category: 'flags',
        }) || this;
    }
    return RoyalGuardTaunt;
}(Enchantment_1.default));
var RoyalGuard = /** @class */ (function (_super) {
    __extends(RoyalGuard, _super);
    function RoyalGuard(game, owner, zone) {
        var _this = _super.call(this, game, owner, zone, 'RoyalGuard', 'Royal Guard', 3, 3, 4, 'Taunt', null, false, null, null) || this;
        _this.enchantments.static.flags.push(new RoyalGuardTaunt(_this.game, _this));
        return _this;
    }
    return RoyalGuard;
}(Minion_1.default));
exports.default = RoyalGuard;
