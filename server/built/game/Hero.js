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
var Card_1 = require("./Card");
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(game, owner, id, name, cost, staticCardText, effects, targeted, targetDomain, targetConstraints) {
        var _this = _super.call(this, game, owner, 'hero', id, name, 'hero', cost, staticCardText, effects, targeted, targetDomain, targetConstraints) || this;
        _this.attack = 1;
        // this.health = 20
        _this.ready = false;
        _this.stats = {
            attack: _this.attack,
            health: _this.owner.health,
        };
        _this.game.event.on('startOfTurn', function (event) { return _this.startOfTurn(event); });
        _this.game.event.on('endOfTurn', function (event) { return _this.endOfTurn(event); });
        return _this;
    }
    Hero.prototype.provideReport = function () {
        this.updateStats();
        this.updateFlags();
        this.updateValidTargets();
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.stats.attack,
            health: this.stats.health,
            type: this.type,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.playerID,
            canBeSelected: this.canAttack(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
        };
    };
    Hero.prototype.updateStats = function () {
        var _this = this;
        var stats = {
            attack: this.attack,
            health: this.owner.health,
        };
        this.enchantments.static.stats.forEach(function (enchantment) {
            if (enchantment.effectActive())
                enchantment.effect.effect(stats, enchantment.effect.value);
        });
        // console.log(this.game.auras.auras.stats)
        this.game.auras.auras.stats[this.type][this.zone].forEach(function (enchantment) {
            if (enchantment.effect.targetRequirement(_this, enchantment))
                enchantment.effect.effect(stats, enchantment.effect.value);
        });
        this.stats = stats;
    };
    Hero.prototype.updateValidTargets = function () {
        var _this = this;
        if (this.zone === 'hand' && this.targeted) {
            var newTargets_1 = this.targetDomain(this.owner);
            this.targetConstraints.forEach(function (constraint) {
                newTargets_1 = newTargets_1.filter(function (target) { return constraint(_this.controller(), _this, target); });
            });
            this.validTargets = newTargets_1;
        }
        else if (this.zone === 'hero') {
            this.validTargets = [this.owner.opponent.hero].concat(this.owner.opponent.board).filter(function (defender) {
                return _this.game.permissions.canAttack(_this, defender);
            });
        }
        else {
            this.validTargets = [];
        }
    };
    Hero.prototype.startOfTurn = function (event) {
        if (event.activePlayer === this.controller() && this.zone === 'hero') {
            this.getReady();
        }
    };
    Hero.prototype.endOfTurn = function (event) {
    };
    Hero.prototype.takeDamage = function (damage) {
        if (damage > 0) {
            this.owner.health -= damage;
            this.updateStats();
            console.log(this.owner.name + " takes " + damage + " damage");
            console.log(this.owner.name + " now has " + this.stats.health + " health");
        }
    };
    Hero.prototype.getReady = function () {
        this.ready = true;
    };
    Hero.prototype.canAttack = function () {
        return this.owner.myTurn() && this.ready && this.owner.hero === this && this.attack > 0;
    };
    return Hero;
}(Card_1.default));
exports.default = Hero;
