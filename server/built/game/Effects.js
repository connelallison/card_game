"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Effects = /** @class */ (function () {
    function Effects(game) {
        this.game = game;
    }
    Effects.prototype.damageChosenTarget = function (value) {
        var _this = this;
        if (value === void 0) { value = 0; }
        return function (player, source, target) {
            _this.game.phases.damagePhase({
                source: source,
                target: target,
                value: value,
            });
        };
    };
    Effects.prototype.damageWeakestEnemyMinion = function (value) {
        var _this = this;
        if (value === void 0) { value = 0; }
        return function (player, source) {
            var targets = player.opponent.board;
            var target = _this.game.utils.findMinByCriterion(targets, function (target) { return target.stats.attack; });
            if (target) {
                _this.game.phases.damagePhase({
                    source: source,
                    target: target,
                    value: value,
                });
            }
        };
    };
    Effects.prototype.drawCards = function (number, constraints) {
        var _this = this;
        if (number === void 0) { number = 1; }
        if (constraints === void 0) { constraints = []; }
        return function (player, source) {
            _this.game.phases.drawPhase({
                player: player,
                number: number,
                constraints: constraints,
            });
        };
    };
    return Effects;
}());
exports.default = Effects;
