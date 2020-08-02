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
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(game, owner, zone, id, name, rawCost, rawAttack, staticCardText, effects, targeted, targetDomain, targetConstraints) {
        var _this = _super.call(this, game, owner, zone, id, name, 'hero', rawCost, rawAttack, staticCardText, effects, targeted, targetDomain, targetConstraints) || this;
        // this.health = 20
        _this.health = _this.owner.health,
            _this.game.event.on('startOfTurn', function (event) { return _this.startOfTurn(event); });
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
            attack: this.attack,
            health: this.health,
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
            attack: this.rawAttack,
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
        this.attack = stats.attack;
        this.health = stats.health;
    };
    Hero.prototype.takeDamage = function (damage) {
        if (damage > 0) {
            this.owner.health -= damage;
            this.updateStats();
            console.log(this.owner.name + " takes " + damage + " damage");
            console.log(this.owner.name + " now has " + this.health + " health");
        }
    };
    Hero.prototype.getReady = function () {
        this.ready = true;
    };
    Hero.prototype.inPlay = function () {
        return this.zone === 'hero';
    };
    return Hero;
}(Character_1.default));
exports.default = Hero;
