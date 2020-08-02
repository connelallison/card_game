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
var Enchantment = /** @class */ (function (_super) {
    __extends(Enchantment, _super);
    function Enchantment(game, owner, id, name, activeZones, activeTypes, sendRequirement, aura, effectType, effect) {
        var _this = _super.call(this, game, owner, id, name, 'enchantment') || this;
        _this.owner = owner;
        _this.activeZones = activeZones;
        _this.activeTypes = activeTypes;
        _this.sendRequirement = sendRequirement;
        _this.aura = aura;
        _this.effectType = effectType;
        _this.effect = effect;
        _this.activeZoneAndType = false;
        return _this;
    }
    Enchantment.prototype.effectActive = function () {
        return this.activeZoneAndType && this.sendRequirement(this);
    };
    Enchantment.prototype.updateActiveZoneAndType = function () {
        var previousActive = this.activeZoneAndType;
        this.activeZoneAndType = this.activeZones.includes(this.owner.zone) && this.activeTypes.includes(this.owner.type);
        if (this.aura) {
            if (!previousActive && this.activeZoneAndType) {
                this.game.auras.emit(this);
            }
            else if (previousActive && !this.activeZoneAndType) {
                this.game.auras.cancel(this);
            }
        }
    };
    return Enchantment;
}(GameObject_1.default));
exports.default = Enchantment;
