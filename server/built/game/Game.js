"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GamePlayer_1 = require("./gameObjects/GamePlayer");
var CardLib_1 = require("./libraries/CardLib");
var DeckLib_1 = require("./libraries/DeckLib");
var AuraManager_1 = require("./gameSystems/AuraManager");
var PhaseManager_1 = require("./gameSystems/PhaseManager");
var Turn_1 = require("./gameObjects/Turn");
var Constraints_1 = require("./libraries/Constraints");
var Effects_1 = require("./libraries/Effects");
var Permissions_1 = require("./gameSystems/Permissions");
var Utils_1 = require("./gameSystems/Utils");
var TestBot_1 = require("./gameTests/TestBot");
// import Card from "./Card";
// import Minion from "./Minion";
// import Spell from "./Spell";
// import { Deck, deck1, deck2 } from "./Deck";
// import EventEmitter from 'events'
var ServerEvent_1 = require("../ServerEvent");
var GameEvent_1 = require("./gameSystems/GameEvent");
var Character_1 = require("./gameObjects/Character");
var Minion_1 = require("./gameObjects/Minion");
var Game = /** @class */ (function () {
    function Game(player1name, player2name, player1deckID, player2deckID, botPlayer1, debug, online, player1socketID, player2socketID, botPlayer2) {
        if (botPlayer1 === void 0) { botPlayer1 = false; }
        if (debug === void 0) { debug = false; }
        if (online === void 0) { online = false; }
        if (player1socketID === void 0) { player1socketID = null; }
        if (player2socketID === void 0) { player2socketID = null; }
        if (botPlayer2 === void 0) { botPlayer2 = false; }
        this.event = new GameEvent_1.default();
        this.botPlayer1 = botPlayer1;
        this.botPlayer2 = botPlayer2;
        this.debug = debug;
        this.online = online;
        this.player1turn = 0;
        this.player2turn = 0;
        this.gameObjects = {};
        this.player1 = new GamePlayer_1.default(this, player1name, player1socketID);
        this.player2 = new GamePlayer_1.default(this, player2name, player2socketID);
        this.auras = new AuraManager_1.default(this);
        this.phases = new PhaseManager_1.default(this);
        this.constraints = new Constraints_1.default(this);
        this.effects = new Effects_1.default(this);
        this.permissions = new Permissions_1.default(this);
        this.utils = new Utils_1.default(this);
        this.inPlay = [this.player1.hero, this.player2.hero];
        this.eventCache = {
            death: [],
            play: [],
            spell: [],
            attack: [],
            damage: [],
            draw: [],
        };
        // this.sequence = []
        // this.sequenceCache = [this.sequence]
        this.player1deckID = player1deckID;
        this.player2deckID = player2deckID;
        this.gameOver = false;
        this.turnLength = 10000;
        // this.turnTimer
        this.turn = null;
        this.turnNumber = 0;
        this.turnCache = [];
        this.winner;
        this.initPlayers();
        this.initListeners();
        this.mulliganPhase();
        this.start();
    }
    Game.prototype.announceGameState = function () {
        if (this.online) {
            // console.log(serverEvent);
            var player1gameState = void 0;
            var player2gameState = void 0;
            if (this.player1.socketID) {
                player1gameState = this.prepareGameState(this.player1);
            }
            if (this.player2.socketID) {
                player2gameState = this.prepareGameState(this.player2);
            }
            // console.log(gameState);
            // console.log(`game: newGameStatus:${this.socketID}`);
            if (this.player1.socketID) {
                ServerEvent_1.default.emit("newGameStatus:" + this.player1.socketID, player1gameState);
            }
            if (this.player2.socketID) {
                ServerEvent_1.default.emit("newGameStatus:" + this.player2.socketID, player2gameState);
            }
            // if (!this.player1.socketID && !this.player2.socketID) {
            //   serverEvent.emit("newGameStatus", gameState);
            // }
        }
    };
    Game.prototype.prepareGameState = function (player) {
        var opponentHand = [];
        for (var i = 0; i < player.opponent.hand.length; i++) {
            opponentHand.push({ type: 'unknown' });
        }
        var gameState = {
            started: true,
            winner: this.winner,
            myTurn: player.myTurn(),
            my: {
                hero: player.heroReport(),
                board: player.boardReport(),
                hand: player.handReport(),
                deck: player.deck.length
            },
            opponent: {
                hero: player.opponent.heroReport(),
                board: player.opponent.boardReport(),
                hand: opponentHand,
                deck: player.opponent.deck.length
            },
        };
        return gameState;
    };
    Game.prototype.announceNewTurn = function () {
        if (this.player1.socketID) {
            ServerEvent_1.default.emit("newTurnTimer:" + this.player1.socketID, this.turn.turnLength);
        }
        if (this.player2.socketID) {
            ServerEvent_1.default.emit("newTurnTimer:" + this.player2.socketID, this.turn.turnLength);
        }
        //  else {
        //   serverEvent.emit("newTurnTimer", this.turnLength);
        // }
    };
    Game.prototype.actionMoveRequest = function (moveRequest, player) {
        var selected = this.gameObjects[moveRequest.selected.objectID];
        var target = moveRequest.target === null ? null : this.gameObjects[moveRequest.target.objectID];
        if (selected instanceof Character_1.default && selected.inPlay()) {
            if (target instanceof Character_1.default && target.inPlay()) {
                if (this.permissions.canAttack(selected, target)) {
                    this.phases.proposedAttackPhase({
                        attacker: selected,
                        defender: target,
                        cancelled: false,
                    });
                }
            }
        }
        else if (selected.zone === 'hand') {
            if (!selected.targeted && selected.canBePlayed()) {
                this.phases.playPhase({
                    player: selected.owner,
                    card: selected,
                });
            }
            else if (this.permissions.canTarget(selected, target)) {
                this.phases.playPhase({
                    player: selected.owner,
                    card: selected,
                    target: target,
                });
            }
        }
        // if (player.myTurn() && selected.owner === player) {
        //   if (selected.zone === "hero" || selected.zone === "board" && selected.type === "minion") {
        //     if (selected.canAttackTarget(target)) {
        //       this.phases.proposedAttackPhase({
        //         attacker: selected,
        //         defender: target,
        //         cancelled: false,
        //       })        
        //     }
        //   } else if (selected.zone === "hand") {
        //     if (selected.canBePlayed()) {
        //       this.phases.playPhase({
        //         player: selected.owner,
        //         card: selected,
        //       })
        //     }
        //   }
        // }
        this.announceGameState();
    };
    // findObjectByPlayerIDZoneAndObjectID (params) {
    //   const { playerID, zone, objectID } = params
    //   const player = this.findPlayerbyPlayerID(playerID)
    //   if (zone === "hero" && player.hero.objectID === objectID) {
    //     return player.hero
    //   } else if (zone === "hand" && player.hand.find(card => card.objectID === objectID) !== undefined) {
    //     return player.hand.find(card => card.objectID === objectID)
    //   } else if (zone === "board" && player.board.find(card => card.objectID === objectID) !== undefined) {
    //     return player.board.find(card => card.objectID === objectID)
    //   } else if (zone === "other") {
    //     throw new Error("findObject: other zones NYI")
    //   } else {
    //     console.log(params)
    //     throw new Error("findObject: not found")
    //   }
    // }
    Game.prototype.findPlayerbyPlayerID = function (playerID) {
        if (this.player1.playerID === playerID) {
            return this.player1;
        }
        else if (this.player2.playerID === playerID) {
            return this.player2;
        }
        else {
            console.log("player1: ", this.player1.playerID);
            console.log("player2: ", this.player2.playerID);
            throw new Error("player " + playerID + " not found");
        }
    };
    Game.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    Game.prototype.initPlayers = function () {
        if (this.botPlayer1) {
            this.player1.bot = true;
        }
        else {
            this.player1.bot = false;
        }
        if (this.botPlayer2) {
            this.player2.bot = true;
        }
        else {
            this.player2.bot = false;
        }
        this.player1.opponent = this.player2;
        this.player2.opponent = this.player1;
        this.player1.deck = DeckLib_1.deck(this, this.player1, this.player1deckID).cards;
        this.player2.deck = DeckLib_1.deck(this, this.player2, this.player2deckID).cards;
    };
    Game.prototype.initListeners = function () {
        var _this = this;
        if (this.player1.socketID) {
            ServerEvent_1.default.on("playerMoveRequest:" + this.player1.socketID, function (moveRequest) {
                _this.actionMoveRequest(moveRequest, _this.player1);
            });
        }
        if (this.player2.socketID) {
            ServerEvent_1.default.on("playerMoveRequest:" + this.player2.socketID, function (moveRequest) {
                _this.actionMoveRequest(moveRequest, _this.player2);
            });
        }
    };
    Game.prototype.removeListeners = function () {
        if (this.player1.socketID) {
            ServerEvent_1.default.removeAllListeners("playerMoveRequest:" + this.player1.socketID);
        }
        if (this.player2.socketID) {
            ServerEvent_1.default.removeAllListeners("playerMoveRequest:" + this.player2.socketID);
        }
    };
    Game.prototype.mulliganPhase = function () {
        for (var i = 0; i < 5; i++) {
            this.player1.mulliganDraw();
        }
        for (var i = 0; i < 6; i++) {
            this.player2.mulliganDraw();
        }
    };
    Game.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var player1minion, player2minion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        player1minion = CardLib_1.create(this, this.player1, 'board', 'PlayerOneMinion');
                        player2minion = CardLib_1.create(this, this.player2, 'board', 'PlayerTwoMinion');
                        if (player1minion instanceof Minion_1.default)
                            this.player1.board.push(player1minion);
                        if (player2minion instanceof Minion_1.default)
                            this.player2.board.push(player2minion);
                        this.inPlay.push(this.player1.board[0]);
                        this.inPlay.push(this.player2.board[0]);
                        console.log('starting game');
                        return [4 /*yield*/, this.sleep(1000)];
                    case 1:
                        _a.sent();
                        this.turnLoop(this.player1);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.turnLoop = function (activePlayer) {
        return __awaiter(this, void 0, void 0, function () {
            var nextActivePlayerPromise, nextActivePlayer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.turnNumber++;
                        this.turn = new Turn_1.default(this, activePlayer, this.turnNumber);
                        this.turnCache.push(this.turn);
                        nextActivePlayerPromise = this.turn.start();
                        this.announceNewTurn();
                        this.announceGameState();
                        TestBot_1.default(this);
                        return [4 /*yield*/, nextActivePlayerPromise];
                    case 1:
                        nextActivePlayer = _a.sent();
                        this.announceGameState();
                        if (nextActivePlayer) {
                            // console.log(nextActivePlayer)
                            this.turnLoop(nextActivePlayer);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.endGame = function () {
        this.turn.over = true;
        this.gameOver = true;
        if (this.player1.alive() && !this.player2.alive()) {
            this.winner = this.player1.name + ' wins';
        }
        else if (!this.player1.alive() && this.player2.alive()) {
            this.winner = this.player2.name + ' wins';
        }
        else if (!this.player1.alive() && !this.player2.alive()) {
            this.winner = 'draw';
        }
        else {
            throw new Error('endGame() has been called but neither player is dead');
        }
        console.log('The game is over. The result is: ' + this.winner);
        this.announceGameState();
        this.removeListeners();
    };
    return Game;
}());
exports.default = Game;
