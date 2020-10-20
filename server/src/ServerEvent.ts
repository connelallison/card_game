import { EventEmitter } from 'events'
class ServerEvent extends EventEmitter {}
const serverEvent = new ServerEvent()
serverEvent.setMaxListeners(2500)

export default serverEvent
