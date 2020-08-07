"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Minion_1 = require("../gameObjects/Minion");
var Leader_1 = require("../gameObjects/Leader");
var PhaseManager = /** @class */ (function () {
    function PhaseManager(game) {
        this.game = game;
        this.deathQueue = [];
    }
    PhaseManager.prototype.steps = function () {
        this.deathPhase();
    };
    PhaseManager.prototype.startOfTurnPhase = function (event) {
        this.game.event.emit('startOfTurn', event);
        this.deathPhase();
    };
    PhaseManager.prototype.endOfTurnPhase = function (event) {
        this.game.event.emit('endOfTurn', event);
        this.deathPhase();
    };
    PhaseManager.prototype.deathPhase = function () {
        var _this = this;
        this.game.inPlay.slice(0).forEach(function (character) {
            if (character.health <= 0) {
                if (character instanceof Leader_1.default) {
                    console.log('hero is dead');
                    _this.game.inPlay.splice(_this.game.inPlay.indexOf(character), 1);
                    _this.game.endGame();
                }
                else if (character instanceof Minion_1.default) {
                    console.log("minion is dying: ", character.name);
                    _this.game.inPlay.splice(_this.game.inPlay.indexOf(character), 1);
                    character.owner.graveyard.push(character.owner.board.splice(character.owner.board.indexOf(character), 1)[0]);
                    character.zone = 'graveyard';
                    character.updateEnchantments();
                    var deathEvent = {
                        object: character,
                        owner: character.owner,
                    };
                    _this.game.turn.cacheEvent(deathEvent, 'death');
                    _this.deathQueue.push(deathEvent);
                }
            }
        });
        if (!this.game.gameOver && this.deathQueue.length > 0) {
            this.game.event.emit('afterDeath', this.deathQueue.shift());
            this.deathPhase();
        }
        else {
            // this.game.announceGameState()
        }
    };
    PhaseManager.prototype.proposedAttackPhase = function (event) {
        this.game.event.emit('proposedAttack', event);
        this.deathPhase();
        if (!event.cancelled)
            this.attackPhase(event);
    };
    PhaseManager.prototype.attackPhase = function (event) {
        this.game.event.emit('beforeAttack', event);
        this.damagePhase({
            source: event.attacker,
            target: event.defender,
            value: event.attacker.attack,
        });
        this.damagePhase({
            source: event.defender,
            target: event.attacker,
            value: event.defender.stats.attack,
        });
        this.game.turn.cacheEvent(event, 'attack');
        event.attacker.ready = false;
        this.game.event.emit('afterAttack', event);
        this.deathPhase();
    };
    PhaseManager.prototype.damagePhase = function (event) {
        this.game.event.emit('beforeDamage', event);
        // console.log(event.target)
        event.target.takeDamage(event.value);
        this.game.turn.cacheEvent(event, 'damage');
        this.game.event.emit('afterDamage', event);
    };
    PhaseManager.prototype.playPhase = function (event) {
        if (event.card.type === 'minion') {
            this.playPhaseMinion(event);
        }
        else if (event.card.type === 'spell') {
            this.playPhaseSpell(event);
        }
        this.deathPhase();
    };
    PhaseManager.prototype.playPhaseMinion = function (event) {
        var player = event.player, card = event.card, _a = event.target, target = _a === void 0 ? null : _a;
        player.spendMana(card.cost);
        card.moveZone('board');
        this.game.inPlay.push(card);
        this.game.turn.cacheEvent(event, 'play');
        this.game.event.emit('onPlay', event);
        this.game.event.emit('onSummon', event);
        // card.onPlay()
        this.game.event.emit('afterPlay', event);
        this.game.event.emit('afterSummon', event);
        // this.deathPhase()
    };
    PhaseManager.prototype.playPhaseSpell = function (event) {
        var player = event.player, card = event.card, _a = event.target, target = _a === void 0 ? null : _a;
        player.spendMana(card.cost);
        card.moveZone('graveyard');
        this.game.turn.cacheEvent(event, 'play');
        this.game.event.emit('onPlay', event);
        this.spellPhase(event);
        this.game.event.emit('afterPlay', event);
        // this.deathPhase()
    };
    PhaseManager.prototype.spellPhase = function (event) {
        var player = event.player, card = event.card, _a = event.target, target = _a === void 0 ? null : _a;
        // console.log(target)
        this.game.event.emit('beforeSpell', event);
        this.game.turn.cacheEvent(event, 'spell');
        card.effects.forEach(function (effect) {
            effect(player, card, target);
        });
        // event.card.onPlay()
        this.game.event.emit('afterSpell', event);
    };
    // summonPhase(event) {
    //     this.game.event.emit('')
    // }
    PhaseManager.prototype.drawPhase = function (event) {
        var _this = this;
        var drawEvent = event;
        this.game.event.emit('proposedDraw', drawEvent);
        var player = drawEvent.player, _a = drawEvent.number, number = _a === void 0 ? 1 : _a, _b = drawEvent.criteria, criteria = _b === void 0 ? [] : _b;
        var drawQueue = player.deck;
        criteria.forEach(function (criterion) { return drawQueue = drawQueue.filter(criterion); });
        var afterDrawQueue = [];
        for (var i = 0; i < number; i++) {
            if (i < drawQueue.length) {
                if (player.hand.length < player.maxHand) {
                    // player draws normally
                    drawQueue[i].moveZone('hand');
                    var event_1 = {
                        player: player,
                        card: drawQueue[i]
                    };
                    this.game.turn.cacheEvent(event_1, 'draw');
                    this.game.event.emit('onDraw', event_1);
                    afterDrawQueue.push(event_1);
                }
                else {
                    // hand is full
                    drawQueue[i].moveZone('graveyard');
                }
            }
            else {
                // attempts to draw, but can't
                player.fatigueCounter++;
                this.damagePhase({
                    source: player,
                    target: player.hero,
                    value: player.fatigueCounter,
                });
            }
        }
        afterDrawQueue.forEach(function (event) {
            _this.game.event.emit('afterDraw', event);
        });
    };
    return PhaseManager;
}());
exports.default = PhaseManager;
