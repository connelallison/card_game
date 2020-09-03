const EventDomains = (object: GameObject, cache: EventsDomainString | EventsDomainString[]) => {
    const eventDomain = []
    if (typeof cache === 'string') cache = [cache]
    cache.forEach(cache => {
        switch (cache) {
            case 'deathEvents':
                eventDomain.push(...object.game.eventCache.death)
                break
            case 'enterPlayEvents':
                eventDomain.push(...object.game.eventCache.enterPlay)
                break
            default:
                break
        }
    })
    return eventDomain
}

export default EventDomains

import GameObject from "../gameObjects/GameObject"
import { EventsDomainString } from "../stringTypes/DomainString"