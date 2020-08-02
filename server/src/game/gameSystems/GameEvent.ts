import { EventEmitter } from 'events'
class GameEvent extends EventEmitter {
    constructor() {
        super()
        this.setMaxListeners(100)
    }
}

export default GameEvent