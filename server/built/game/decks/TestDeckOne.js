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
var Deck = require('../gameObjects/Deck');
var create = require('../libraries/CardLib').create;
var TestDeckOne = /** @class */ (function (_super) {
    __extends(TestDeckOne, _super);
    function TestDeckOne(game, owner) {
        var _this = this;
        var cards = [
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'Footman',
            'RoyalGuard',
            'RoyalGuard',
            'RoyalGuard',
            'RoyalGuard',
            'RoyalGuard',
            'RoyalGuard',
            'Fireburst',
            'Fireburst',
            'Fireburst',
            'Fireburst',
            'Fireburst',
            'Fireburst',
        ];
        _this = _super.call(this, game, owner, 'TestDeckOne', 'Test Deck 1', cards) || this;
        return _this;
    }
    return TestDeckOne;
}(Deck));
module.exports = TestDeckOne;
