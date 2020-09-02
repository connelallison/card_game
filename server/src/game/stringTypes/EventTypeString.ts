type EventTypeString = 'death' 
                        | 'play' 
                        | 'action' 
                        | 'attack' 
                        | 'damage' 
                        | 'healing' 
                        | 'draw' 
                        | 'enterPlay' 
                        | 'summon' 
                        | 'use' 
                        | 'startOfTurn' 
                        | 'endOfTurn' 
                        | 'spendMoney'
                        | 'trigger'

// import EventCache from "../gamePhases/EventCache"

// type EventTypeString = keyof typeof EventCache

export default EventTypeString