import { EventEmitter } from 'events'
class ServerEvent extends EventEmitter {}
const serverEvent = new ServerEvent()

export default serverEvent
