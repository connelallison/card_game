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
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(game, owner, zone, id, name, type, rawCost, rawAttack, staticCardText, effects, targeted, targetDomain, targetConstraints) {
        var _this = _super.call(this, game, owner, zone, id, name, type, rawCost, staticCardText, effects, targeted, targetDomain, targetConstraints) || this;
        _this.rawAttack = rawAttack;
        _this.attack = _this.rawAttack;
        _this.ready = false;
        _this.game.event.on('startOfTurn', function (event) { return _this.startOfTurn(event); });
        return _this;
    }
    Character.prototype.provideReport = function () {
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
    Character.prototype.updateValidTargets = function () {
        var _this = this;
        if (!this.inPlay() && this.targeted) {
            var newTargets_1 = this.targetDomain(this.owner);
            this.targetConstraints.forEach(function (constraint) {
                newTargets_1 = newTargets_1.filter(function (target) { return constraint(_this.controller(), _this, target); });
            });
            this.validTargets = newTargets_1;
        }
        else if (this.inPlay()) {
            this.validTargets = [this.owner.opponent.hero].concat(this.owner.opponent.board).filter(function (defender) {
                return _this.game.permissions.canAttack(_this, defender);
            });
        }
        else {
            this.validTargets = [];
        }
    };
    Character.prototype.startOfTurn = function (event) {
        if (event.activePlayer === this.controller() && this.inPlay()) {
            this.getReady();
        }
    };
    Character.prototype.getReady = function () {
        this.ready = true;
    };
    Character.prototype.canAttack = function () {
        return this.owner.myTurn() && this.ready && this.inPlay() && this.attack > 0;
    };
    return Character;
}(Card_1.default));
exports.default = Character;
