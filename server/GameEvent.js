const EventEmitter = require('events')
class GameEvent extends EventEmitter {}
const gameEvent = new GameEvent()

module.exports = gameEvent
