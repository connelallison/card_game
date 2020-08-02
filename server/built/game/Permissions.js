"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Permissions = /** @class */ (function () {
    function Permissions(game) {
        this.game = game;
    }
    Permissions.prototype.canAttack = function (attacker, defender) {
        return (attacker.canAttack()
            && (defender.type === 'minion' && defender.zone === 'board' || defender.type === 'hero' && defender.zone === 'hero')
            && defender.owner === attacker.owner.opponent
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
            && (card.type !== 'spell' || !card.targeted || card.validTargets.length > 0)
            && (card.type !== 'minion' || player.board.length < player.maxBoard));
    };
    return Permissions;
}());
exports.default = Permissions;
