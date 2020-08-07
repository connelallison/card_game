"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericLeader_1 = require("../cards/GenericLeader");
var GamePlayer = /** @class */ (function () {
    function GamePlayer(game, name, socketID, bot) {
        var _this = this;
        if (socketID === void 0) { socketID = null; }
        if (bot === void 0) { bot = false; }
        this.game = game;
        this.name = name;
        this.playerID = this.name + ":" + Math.random();
        this.socketID = socketID;
        this.health = 20;
        this.hero = new GenericLeader_1.default(this.game, this, 'hero');
        this.maxMana = 2;
        this.currentMana = 2;
        this.hand = [];
        this.maxHand = 7;
        this.deck = [];
        this.fatigueCounter = 0;
        this.board = [];
        this.maxBoard = 5;
        this.graveyard = [];
        this.passives = [];
        this.opponent;
        this.bot;
        this.game.event.on('startOfTurn', function (event) { return _this.startOfTurn(event); });
        this.game.event.on('endOfTurn', function (event) { return _this.endOfTurn(event); });
    }
    GamePlayer.prototype.heroReport = function () {
        return Object.assign({}, this.hero.provideReport(), { maxMana: this.maxMana, currentMana: this.currentMana });
    };
    GamePlayer.prototype.boardReport = function () {
        return this.board.map(function (minion) {
            return minion.provideReport();
        });
    };
    GamePlayer.prototype.handReport = function () {
        return this.hand.map(function (card) {
            return card.provideReport();
        });
    };
    GamePlayer.prototype.myTurn = function () {
        return this.game.turn.activePlayer === this;
    };
    GamePlayer.prototype.startOfTurn = function (event) {
        if (this.myTurn()) {
            this.gainMaxMana(1);
            this.refillMana();
        }
    };
    GamePlayer.prototype.endOfTurn = function (event) {
        if (this.myTurn()) {
            this.game.phases.drawPhase({
                player: this
            });
        }
    };
    GamePlayer.prototype.controller = function () {
        return this;
    };
    GamePlayer.prototype.mulliganDraw = function () {
        if (this.deck.length > 0) {
            if (this.hand.length < this.maxHand) {
                var card = this.deck.shift();
                this.hand.push(card);
                card.zone = 'hand';
                card.updateEnchantments();
            }
            else {
                var card = this.deck.shift();
                this.graveyard.push(card);
                card.zone = 'graveyard';
                card.updateEnchantments();
            }
        }
        else {
            // throw "overdrew and died"
        }
    };
    GamePlayer.prototype.playableCards = function () {
        var _this = this;
        // console.log("this.hand is: " + this.hand);
        // console.log("this.playableCards() is: " + this.hand.filter(card => this.canPlay(card)));
        return this.hand.filter(function (card) { return _this.canPlay(card); });
        // console.log(this.hand.filter(this.canPlay.bind(this)));
    };
    GamePlayer.prototype.canPlay = function (card) {
        // console.log(card);
        // if (card.type === 'minion') {
        //   return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana && this.board.length < this.maxBoard 
        // } else if (card.type === 'spell') {
        //   return this.myTurn() && this.hand.includes(card) && card.cost <= this.currentMana 
        // } else {
        //   throw new Error(`Card (${card.name}) has ${card.type} for its type.`)
        // }
        return this.game.permissions.canPlay(this, card);
    };
    // play(card) {
    //   // console.log(this.currentMana);
    //   if (this.canPlay(card)) {
    //     this.spendMana(card.cost)
    //     if (card.type === 'minion') {
    //       this.board.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
    //       card.zone = 'board'
    //       card.updateEnchantments()
    //       this.game.inPlay.push(card)
    //       // this.played.push(card)
    //       // this.summoned.push(card)
    //       // card.onPlay()
    //       this.game.announceGameState()
    //     } else if (card.type === 'spell') {
    //       this.graveyard.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
    //       card.zone = 'graveyard'
    //       card.updateEnchantments()
    //       // this.played.push(card)
    //       // card.onPlay()
    //       this.game.announceGameState()
    //     }
    //   }
    // }
    // summon(cardID) {
    //   if (this.board.length < this.maxBoard) {
    //     const card = create(this.game, this, 'board', cardID)
    //     this.board.push(card)
    //     this.game.inPlay.push(card)
    //   }
    // }
    GamePlayer.prototype.alive = function () {
        return this.hero.health > 0;
    };
    GamePlayer.prototype.spendMana = function (amount) {
        this.currentMana -= amount;
    };
    GamePlayer.prototype.refillMana = function () {
        if (this.currentMana < this.maxMana) {
            this.currentMana = this.maxMana;
        }
    };
    GamePlayer.prototype.gainMaxMana = function (number) {
        this.maxMana += number;
    };
    GamePlayer.prototype.loseMaxMana = function (number) {
        if (this.maxMana - number >= 0) {
            this.maxMana -= number;
        }
        else {
            this.maxMana = 0;
        }
    };
    GamePlayer.prototype.reportPlayableCards = function () {
        return this.playableCards().map(function (card) {
            return card.provideReport();
        });
    };
    return GamePlayer;
}());
exports.default = GamePlayer;
