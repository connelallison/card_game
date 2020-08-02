"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var PlayerOneMinion_1 = require("./cards/PlayerOneMinion");
var PlayerTwoMinion_1 = require("./cards/PlayerTwoMinion");
var Footman_1 = require("./cards/Footman");
var RoyalGuard_1 = require("./cards/RoyalGuard");
var JuniorOrc_1 = require("./cards/JuniorOrc");
var Fireburst_1 = require("./cards/Fireburst");
var Consume_1 = require("./cards/Consume");
var Cards = {
    PlayerOneMinion: PlayerOneMinion_1.default,
    PlayerTwoMinion: PlayerTwoMinion_1.default,
    Footman: Footman_1.default,
    RoyalGuard: RoyalGuard_1.default,
    JuniorOrc: JuniorOrc_1.default,
    Fireburst: Fireburst_1.default,
    Consume: Consume_1.default
};
exports.create = function (game, owner, zone, cardID) {
    if (Cards[cardID]) {
        return new Cards[cardID](game, owner, zone);
    }
    else {
        throw new Error("Card \"" + cardID + "\" not found in Cards.");
    }
};
// const CardLib = { create, Cards } 
// export default create
