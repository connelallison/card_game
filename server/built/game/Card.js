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
var GameObject_1 = require("./GameObject");
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(game, owner, zone, id, name, type, cost, staticCardText, effects, targeted, targetDomain, targetConstraints) {
        if (staticCardText === void 0) { staticCardText = ''; }
        if (effects === void 0) { effects = []; }
        if (targeted === void 0) { targeted = false; }
        var _this = _super.call(this, game, owner, id, name, type) || this;
        _this.zone = zone;
        _this.cost = cost;
        _this.staticCardText = staticCardText;
        _this.effects = effects;
        _this.targeted = targeted;
        _this.targetDomain = targetDomain;
        _this.targetConstraints = targetConstraints;
        _this.validTargets = [];
        _this.flags = {};
        return _this;
    }
    Card.prototype.provideReport = function () {
        this.updateFlags();
        this.updateValidTargets();
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            type: this.type,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.playerID,
            canBeSelected: this.canBePlayed(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
        };
    };
    Card.prototype.updateFlags = function () {
        var _this = this;
        var flags = {};
        this.enchantments.static.flags.forEach(function (enchantment) {
            if (enchantment.effectActive())
                enchantment.effect.effect(flags, enchantment.effect.value);
        });
        this.game.auras.auras.flags[this.type][this.zone].forEach(function (enchantment) {
            if (enchantment.effect.targetRequirement(_this, enchantment))
                enchantment.effect.effect(flags, enchantment.effect.value);
        });
        this.flags = flags;
    };
    Card.prototype.updateValidTargets = function () {
        var _this = this;
        if (this.zone === 'hand' && this.targeted) {
            var newTargets_1 = this.targetDomain(this.owner);
            this.targetConstraints.forEach(function (constraint) {
                newTargets_1 = newTargets_1.filter(function (target) { return constraint(_this.controller(), _this, target); });
            });
            this.validTargets = newTargets_1;
        }
        else {
            this.validTargets = [];
        }
    };
    Card.prototype.moveZone = function (destination) {
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1);
        this.owner[destination].push(this);
        this.zone = destination;
        this.updateEnchantments();
    };
    Card.prototype.validTargetIDs = function () {
        return this.validTargets.map(function (target) { return target.objectID; });
    };
    Card.prototype.canBePlayed = function () {
        return this.owner.canPlay(this);
    };
    return Card;
}(GameObject_1.default));
exports.default = Card;
