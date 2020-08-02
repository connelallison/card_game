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
var Spell_1 = require("../Spell");
var Consume = /** @class */ (function (_super) {
    __extends(Consume, _super);
    function Consume(game, owner, zone) {
        return _super.call(this, game, owner, zone, 'Consume', 'Consume', 3, 'Deal 3 damage to the weakest enemy minion and draw a card.', [game.effects.damageWeakestEnemyMinion(3), game.effects.drawCards()], false, null, null) || this;
    }
    return Consume;
}(Spell_1.default));
exports.default = Consume;
