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
var Spell_1 = require("../gameObjects/Spell");
var Fireburst = /** @class */ (function (_super) {
    __extends(Fireburst, _super);
    function Fireburst(game, owner, zone) {
        return _super.call(this, game, owner, zone, 'Fireburst', 'Fireburst', 1, 'Deal 3 damage to a minion with 4 or more attack.', [game.effects.damageChosenTarget(3)], true, game.utils.targetDomain(['enemyMinions', 'friendlyMinions',]), [game.constraints.minAttack(4)]) || this;
    }
    return Fireburst;
}(Spell_1.default));
exports.default = Fireburst;
