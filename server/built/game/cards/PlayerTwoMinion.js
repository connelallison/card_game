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
var Minion_1 = require("../gameObjects/Minion");
var PlayerTwoMinion = /** @class */ (function (_super) {
    __extends(PlayerTwoMinion, _super);
    function PlayerTwoMinion(game, owner, zone) {
        return _super.call(this, game, owner, zone, 'PlayerTwoMinion', 'Player 2 Minion', 3, 3, 4, '', null, false, null, null) || this;
    }
    return PlayerTwoMinion;
}(Minion_1.default));
exports.default = PlayerTwoMinion;
