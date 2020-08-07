"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Minion_1 = require("../gameObjects/Minion");
var Spell_1 = require("../gameObjects/Spell");
var Permissions = /** @class */ (function () {
    function Permissions(game) {
        this.game = game;
    }
    Permissions.prototype.canAttack = function (attacker, defender) {
        return (attacker.canAttack()
            && defender.inPlay()
            && defender.controller() === attacker.controller().opponent
            && this.game.utils.notBehindTaunt(defender));
    };
    Permissions.prototype.canTarget = function (card, target) {
        return (card.targeted
            && card.targetDomain(card.owner).includes(target)
            && card.targetConstraints.every(function (constraint) { return constraint(card.controller(), card, target); }));
    };
    Permissions.prototype.canPlay = function (player, card) {
        return (player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && card.cost <= player.currentMana
            && (card instanceof Spell_1.default || !card.targeted || card.validTargets.length > 0)
            && (card instanceof Minion_1.default || player.board.length < player.maxBoard));
    };
    return Permissions;
}());
exports.default = Permissions;
