const EventEmitter = require('events')
class ServerEvent extends EventEmitter {}
const serverEvent = new ServerEvent()

module.exports = serverEvent
