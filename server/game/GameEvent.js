const EventEmitter = require('events')
class GameEvent extends EventEmitter {
    constructor() {
        super()
        this.setMaxListeners(100)
    }
}

module.exports = GameEvent