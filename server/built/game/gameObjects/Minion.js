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
var Character_1 = require("./Character");
var Minion = /** @class */ (function (_super) {
    __extends(Minion, _super);
    function Minion(game, owner, zone, id, name, rawCost, rawAttack, rawHealth, staticCardText, effects, targeted, targetDomain, targetConstraints) {
        if (staticCardText === void 0) { staticCardText = ''; }
        var _this = _super.call(this, game, owner, zone, id, name, 'minion', rawCost, rawAttack, staticCardText, effects, targeted, targetDomain, targetConstraints) || this;
        _this.rawHealth = rawHealth;
        _this.health = _this.rawHealth,
            _this.game.event.on('startOfTurn', function (event) { return _this.startOfTurn(event); });
        return _this;
    }
    Minion.prototype.provideReport = function () {
        this.updateStats();
        this.updateFlags();
        this.updateValidTargets();
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.attack,
            health: this.health,
            type: this.type,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.playerID,
            canBeSelected: this.canBeSelected(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
        };
    };
    Minion.prototype.updateStats = function () {
        var _this = this;
        var stats = {
            attack: this.rawAttack,
            health: this.rawHealth,
        };
        this.enchantments.static.stats.forEach(function (enchantment) {
            if (enchantment.effectActive())
                enchantment.effect.effect(stats, enchantment.effect.value);
        });
        this.game.auras.auras.stats[this.type][this.zone].forEach(function (enchantment) {
            if (enchantment.effect.targetRequirement(_this, enchantment))
                enchantment.effect.effect(stats, enchantment.effect.value);
        });
        this.attack = stats.attack;
        this.health = stats.health;
    };
    Minion.prototype.updateValidTargets = function () {
        var _this = this;
        if (this.zone === 'hand' && this.targeted) {
            var newTargets_1 = this.targetDomain(this.owner);
            this.targetConstraints.forEach(function (constraint) {
                newTargets_1 = newTargets_1.filter(function (target) { return constraint(_this.controller(), _this, target); });
            });
            this.validTargets = newTargets_1;
        }
        else if (this.zone === 'board') {
            this.validTargets = [this.owner.opponent.hero].concat(this.owner.opponent.board).filter(function (defender) {
                return _this.game.permissions.canAttack(_this, defender);
            });
        }
        else {
            this.validTargets = [];
        }
    };
    Minion.prototype.canBePlayed = function () {
        return this.owner.canPlay(this);
    };
    Minion.prototype.canBeSelected = function () {
        if (this.zone === 'board') {
            return this.validTargets.length > 0;
        }
        else {
            return this.canBePlayed();
        }
    };
    Minion.prototype.getReady = function () {
        if (this.zone === 'board') {
            this.ready = true;
        }
        else {
            throw new Error("getReady() is being called on a minion (" + this.name + ") with this.zone not set to board");
        }
    };
    Minion.prototype.takeDamage = function (damage) {
        if (damage > 0) {
            this.rawHealth -= damage;
            this.updateStats();
            // console.log(`${this.name} takes ${damage} damage`);
        }
    };
    Minion.prototype.inPlay = function () {
        return this.zone === 'board';
    };
    return Minion;
}(Character_1.default));
exports.default = Minion;
