"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils(game) {
        this.game = game;
    }
    Utils.prototype.shuffle = function (array) {
        var _a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
    };
    Utils.prototype.findMinByCriterion = function (array, criterion) {
        var minObj;
        if (array.length > 0) {
            minObj = array[0];
            array.forEach(function (obj) {
                if (criterion(obj) < criterion(minObj))
                    minObj = obj;
            });
        }
        return minObj;
    };
    Utils.prototype.targetDomain = function (zones) {
        return function (player) {
            var targetDomain = [];
            zones.forEach(function (zone) {
                switch (zone) {
                    case 'enemyMinions':
                        targetDomain.push.apply(targetDomain, player.opponent.board);
                        break;
                    case 'enemyHero':
                        targetDomain.push(player.opponent.hero);
                        break;
                    case 'friendlyMinions':
                        targetDomain.push.apply(targetDomain, player.board);
                        break;
                    case 'friendlyHero':
                        targetDomain.push(player.hero);
                        break;
                    default:
                        break;
                }
            });
            return targetDomain;
        };
    };
    Utils.prototype.notBehindTaunt = function (character) {
        return character.flags.taunt || character.controller().board.every(function (minion) { return minion.flags.taunt !== true; });
    };
    return Utils;
}());
exports.default = Utils;
