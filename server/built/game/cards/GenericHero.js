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
var Hero_1 = require("../Hero");
var GenericHero = /** @class */ (function (_super) {
    __extends(GenericHero, _super);
    function GenericHero(game, owner) {
        return _super.call(this, game, owner, 'GenericHero', 'Hero', 0, '', null, false, null, null) || this;
    }
    return GenericHero;
}(Hero_1.default));
exports.default = GenericHero;
