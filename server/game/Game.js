const GamePlayer = require('./GamePlayer.js')
const { create } = require('./CardLib')
const { deck } = require('./DeckLib')
const AuraManager = require('./AuraManager.js')
const PhaseManager = require('./PhaseManager.js')
// const Card = require("./Card.js");
// const Minion = require("./Minion.js");
// const Spell = require("./Spell.js");
// const { Deck, deck1, deck2 } = require("./Deck.js");
// const EventEmitter = require('events')
const serverEvent = require('../ServerEvent.js')
const GameEvent = require('./GameEvent.js')

class Game {
  constructor (player1name, player2name, player1deckID, player2deckID, botPlayer1 = false, debug = false, online = false, player1socketID = null, player2socketID = null, botPlayer2 = false) {
    // Game.games.push(this);
    this.event = new GameEvent()
    this.botPlayer1 = botPlayer1
    this.botPlayer2 = botPlayer2
    this.debug = debug
    this.online = online
    this.player1turn = 0
    this.player2turn = 0
    this.player1 = new GamePlayer(player1name, player1socketID)
    this.player2 = new GamePlayer(player2name, player2socketID)
    this.auras = new AuraManager(this)
    this.phases = new PhaseManager(this)
    this.inPlay = [this.player1.hero, this.player2.hero]
    this.deathEvents = []
    this.player1deckID = player1deckID
    this.player2deckID = player2deckID
    this.activePlayer = null
    this.nextActivePlayer = this.player1
    this.nextNextActivePlayer = this.player2
    this.gameOver = false
    this.turnLength = 10000
    this.turnTimer
    this.winner
    this.initPlayers()
    this.initListeners()
    this.mulliganPhase()
    this.start()
    // this.startTurn = this.startTurn.bind(this);
    // this.endTurn = this.endTurn.bind(this);
  }

  announceGameState () {
    if (this.online) {
      // console.log(serverEvent);
      let player1gameState
      let player2gameState
      if (this.player1.socketID) {
        player1gameState = this.prepareGameState(this.player1)
      }
      if (this.player2.socketID) {
        player2gameState = this.prepareGameState(this.player2)
      }
      // console.log(gameState);
      // console.log(`game: newGameStatus:${this.socketID}`);
      if (this.player1.socketID) {
        serverEvent.emit(`newGameStatus:${this.player1.socketID}`, player1gameState)
      }
      if (this.player2.socketID) {
        serverEvent.emit(`newGameStatus:${this.player2.socketID}`, player2gameState)
      }
      // if (!this.player1.socketID && !this.player2.socketID) {
      //   serverEvent.emit("newGameStatus", gameState);
      // }
    }
  }

  prepareGameState (player) {
    const opponentHand = []
    for (let i = 0; i < player.opponent.hand.length; i++) {
      opponentHand.push({ type: 'unknown' })
    }
    const gameState = {
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
    }
    return gameState
  }


  announceNewTurn () {
    if (this.player1.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player1.socketID}`, this.turnLength)
    }
    if (this.player2.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player2.socketID}`, this.turnLength)
    }
    //  else {
    //   serverEvent.emit("newTurnTimer", this.turnLength);
    // }
  }

  actionMoveRequest (moveRequest, player) {
    // console.log(moveRequest)
    const selected = this.findObjectByPlayerIDZoneAndObjectID(moveRequest.selected)
    const target = moveRequest.target === null ? null : this.findObjectByPlayerIDZoneAndObjectID(moveRequest.target)
    if (player.myTurn() && selected.owner === player) {
      if (selected.zone === "hero" || selected.zone === "board" && selected.type === "minion") {
        // this.phases.proposedAttack({
        //   attacker: selected,
        //   defender: target,
        // })
        if (selected.canAttackTarget(target)) {
          this.phases.proposedAttackPhase({
            attacker: selected,
            defender: target,
            cancelled: false,
          })        
        }
        // if (selected.canAttackTarget(target)) {
        //   selected.makeAttack(target)
        // }
      } else if (selected.zone === "hand") {
        if (selected.canBePlayed()) {
          this.phases.playPhase({
            player: selected.owner,
            card: selected,
          })
          // player.play(selected)
        }
      }
    }
    this.announceGameState()
  }

  findObjectByPlayerIDZoneAndObjectID (params) {
    const { playerID, zone, objectID } = params
    const player = this.findPlayerbyPlayerID(playerID)
    if (zone === "hero" && player.hero.objectID === objectID) {
      return player.hero
    } else if (zone === "hand" && player.hand.find(card => card.objectID === objectID) !== undefined) {
      return player.hand.find(card => card.objectID === objectID)
    } else if (zone === "board" && player.board.find(card => card.objectID === objectID) !== undefined) {
      return player.board.find(card => card.objectID === objectID)
    } else if (zone === "other") {
      throw new Error("findObject: other zones NYI")
    } else {
      throw new Error("findObject: not found")
    }
  }

  findPlayerbyPlayerID (playerID) {
    if (this.player1.playerID === playerID) {
      return this.player1
    } else if (this.player2.playerID === playerID) {
      return this.player2
    } else {
      console.log("player1: ", this.player1.playerID)
      console.log("player2: ", this.player2.playerID)
      throw new Error(`player ${playerID} not found`)
    }
  }

  allActive () {
    const allActive = this.board().concat(this.hands()).concat(this.decks())
    return allActive
  }

  graveyard () {
    if (this.activePlayer) {
      return this.activePlayer.graveyard.concat(this.nextActivePlayer.graveyard)
    } else {
      return this.nextActivePlayer.graveyard.concat(this.nextNextActivePlayer.graveyard)
    }
  }

  played () {
    if (this.activePlayer) {
      return this.activePlayer.played.concat(this.nextActivePlayer.played)
    } else {
      return this.nextActivePlayer.played.concat(this.nextNextActivePlayer.played)
    }
  }

  summoned () {
    if (this.activePlayer) {
      return this.activePlayer.summoned.concat(this.nextActivePlayer.summoned)
    } else {
      return this.nextActivePlayer.summoned.concat(this.nextNextActivePlayer.summoned)
    }
  }

  board () {
    if (this.activePlayer) {
      return this.activePlayer.board.concat(this.nextActivePlayer.board)
    } else {
      return this.nextActivePlayer.board.concat(this.nextNextActivePlayer.board)
    }
  }

  hands () {
    if (this.activePlayer) {
      return this.activePlayer.hand.concat(this.nextActivePlayer.hand)
    } else {
      return this.nextActivePlayer.hand.concat(this.nextNextActivePlayer.hand)
    }
  }

  decks () {
    if (this.activePlayer) {
      return this.activePlayer.deck.concat(this.nextActivePlayer.deck)
    } else {
      return this.nextActivePlayer.deck.concat(this.nextNextActivePlayer.deck)
    }
  }

  // delay (n) {
  //   n = n || 1000
  //   return new Promise(done => {
  //     setTimeout(() => {
  //       done()
  //     }, n)
  //   })
  // }

  initPlayers () {
    if (this.botPlayer1) {
      this.player1.bot = true
    } else {
      this.player1.bot = false
    }
    if (this.botPlayer2) {
      this.player2.bot = true
    } else {
      this.player2.bot = false
    }
    this.player1.opponent = this.player2
    this.player2.opponent = this.player1
    this.player1.game = this
    this.player2.game = this
    this.player1.deck = deck(this.player1deckID, this.player1).cards
    this.player2.deck = deck(this.player2deckID, this.player2).cards
    this.player1.allActive().forEach((card) => { card.owner = this.player1 })
    this.player2.allActive().forEach((card) => { card.owner = this.player2 })
  }

  initListeners () {
    if (this.player1.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player1.socketID}`, (moveRequest) => {
        this.actionMoveRequest(moveRequest, this.player1)
      })
    }
    if (this.player2.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player2.socketID}`, (moveRequest) => {
        this.actionMoveRequest(moveRequest, this.player2)
      })
    }
  }

  removeListeners () {
    if (this.player1.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player1.socketID}`)
    }
    if (this.player2.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player2.socketID}`)
    }
  }

  mulliganPhase () {
    for (let i = 0; i < 5; i++) {
      this.player1.mulliganDraw()
    }
    for (let i = 0; i < 6; i++) {
      this.player2.mulliganDraw()
    }
  }

  start () {
    this.player1.board.push(create('PlayerOneMinion'))
    this.player1.board[0].zone = 'board'
    this.player1.board[0].owner = this.player1
    this.player2.board.push(create('PlayerTwoMinion'))
    this.player2.board[0].zone = 'board'
    this.player2.board[0].owner = this.player2
    this.inPlay.push(this.player1.board[0])
    this.inPlay.push(this.player2.board[0])
    // console.log(this);
    // this.announceGameState();
    console.log('starting game')
    setTimeout(this.startTurn.bind(this), 1000)
    // this.startTurn();
  }

  startTurn () {
    if (this.nextActivePlayer === this.player1) {
      this.player1turn++
      if (this.debug) { console.log('Start of turn ' + this.player1turn + ' for ' + this.player1.name) }
    } else {
      this.player2turn++
      if (this.debug) { console.log('Start of turn ' + this.player2turn + ' for ' + this.player2.name) }
    }
    this.allActive().forEach((card) => {
      card.onAnyTurnStart()
    })
    this.nextActivePlayer.allActive().forEach((card) => {
      card.onMyTurnStart()
    })
    // console.log("\nBefore gaining mana: ");
    // console.log(`Max mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.maxMana}`);
    // console.log(`Current mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.currentMana}`);
    this.nextActivePlayer.gainMaxMana(1)
    this.nextActivePlayer.refillMana()
    // console.log("\nAfter gaining mana: ");
    // console.log(`Max mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.maxMana}`);
    // console.log(`Current mana of ${this.nextActivePlayer.name}: ${this.nextActivePlayer.currentMana}`);
    this.nextActivePlayer.board.forEach((minion) => {
      minion.readyMinion()
    })
    this.nextActivePlayer.hero.readyHero()
    this.activePlayer = this.nextActivePlayer
    this.nextActivePlayer = this.nextNextActivePlayer
    this.nextNextActivePlayer = this.activePlayer
    this.announceNewTurn()
    this.announceGameState()
    // console.log(`\n${this.activePlayer.name}'s playable cards: `);
    // console.log(this.activePlayer.playableCards().map((card) => { return card.name; }));
    // this.delay();
    if (!this.gameOver && this.activePlayer.bot) {
      if (this.activePlayer.playableCards().length > 0) {
        this.phases.playPhase({
          player: this.activePlayer,
          card: this.activePlayer.playableCards()[0]
        })
        this.announceGameState()
        // this.activePlayer.play(this.activePlayer.playableCards()[0])
      } else {
        console.log('no playable cards')
        console.log(this.activePlayer)
      }
    }
    // this.delay();
    // console.log(`\n${this.activePlayer.name}'s minions ready to attack: `);
    // console.log(this.activePlayer.minionsReadyToAttack().map((card) => { return [card.name, card.health]; }));
    if (!this.gameOver && this.activePlayer.bot) {
      this.activePlayer.minionsReadyToAttack().forEach((minion) => {
        if (minion.owner.opponent.board[0]) {
          this.phases.proposedAttackPhase({
            attacker: minion,
            defender: minion.owner.opponent.board[0],
            cancelled: false,
          })  
          this.announceGameState()
          // minion.makeAttack(minion.owner.opponent.board[0])
        } else {
          this.phases.proposedAttackPhase({
            attacker: minion,
            defender: minion.owner.opponent.hero,
            cancelled: false,
          })  
          this.announceGameState()
          // minion.makeAttack(minion.owner.opponent.hero)
        }
        // this.delay(2000);
      })
    }
    // console.log("\nAfter becoming active: ");
    // console.log(`Max mana of ${this.activePlayer.name}: ${this.activePlayer.maxMana}`);
    // console.log(`Current mana of ${this.activePlayer.name}: ${this.activePlayer.currentMana}`);
    if (!this.gameOver) {
      if (this.debug) { console.log(this.activePlayer.name + ' is the active player.') }
      this.turnTimer = setTimeout(this.endTurn.bind(this), this.turnLength)
    }
  }

  endTurn () {
    // console.log(this);
    // if (this.debug) {
    //   console.log(this.activePlayer);
    //   console.log(this.nextActivePlayer);
    //   console.log(this.nextNextActivePlayer);
    // }
    this.turnTimer = null
    this.activePlayer = null
    this.phases.drawPhase({
      player: this.nextActivePlayer
    })
    // this.nextNextActivePlayer.draw()
    console.log(`${this.nextNextActivePlayer.name} draws a card`)
    this.nextNextActivePlayer.allActive().forEach((card) => {
      card.onMyTurnEnd()
    })
    if (this.debug) {
      if (this.nextNextActivePlayer === this.player1) {
        console.log('End of turn ' + this.player1turn + ' for ' + this.player1.name)
      } else {
        console.log('End of turn ' + this.player2turn + ' for ' + this.player2.name)
      }
    }
    this.announceGameState()
    if (!this.gameOver) {
      this.startTurn()
    }
  }

  resolveDamage () {
    // this.board().forEach((minion) => {
    //   if (minion.stats.health <= 0) {
    //     minion.owner.graveyard.push(minion.owner.board.splice(minion.owner.board.indexOf(minion), 1)[0])
    //     minion.zone = 'graveyard'
    //     minion.updateEnchantments()
    //     minion.onDeath()
    //     console.log(`${minion.name} has died and been sent to the graveyard`)
    //   }
    // })
    // if (!this.activePlayer) {
    //   // throw new Error('active player is ' + this.activePlayer)
    // }
    // if (!this.activePlayer.alive() || !this.nextActivePlayer.alive()) {
    //   this.endGame()
    // }
    // this.announceGameState()
  }

  endGame () {
    if (this.turnTimer) {
      clearTimeout(this.turnTimer)
      this.turnTimer = null
    }
    this.activePlayer = null
    this.nextActivePlayer = null
    this.nextNextActivePlayer = null
    this.gameOver = true
    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = this.player1.name + ' wins'
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = this.player2.name + ' wins'
    } else if (!this.player1.alive() && !this.player2.alive()) {
      this.winner = 'draw'
    } else {
      throw new Error('endGame() has been called but neither player is dead')
    }
    console.log('The game is over. The result is: ' + this.winner)
    this.announceGameState()
    this.removeListeners()
  }
}

// Game.games = [];

module.exports = Game
