"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constraints = /** @class */ (function () {
    function Constraints(game) {
        this.game = game;
    }
    Constraints.prototype.minAttack = function (minAttack) {
        return function (controller, source, target) { return target.attack >= minAttack; };
    };
    return Constraints;
}());
exports.default = Constraints;
