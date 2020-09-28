const TargetDomains = (object: GameObject, zones: TargetsDomainString | TargetsDomainString[]) => {
    const targetDomain: GameObject[] = []
    if (typeof zones === 'string') zones = [zones]
    zones.forEach(zone => {
        switch (zone) {
            case 'self':
                targetDomain.push(object.effectOwner())
                break
            case 'leftFollower':
                if ((object instanceof Follower || object instanceof BoardSlot) && object.leftFollower()) targetDomain.push(object.leftFollower())
                break
            case 'rightFollower':
                if ((object instanceof Follower || object instanceof BoardSlot) && object.rightFollower()) targetDomain.push(object.rightFollower())
                break
            case 'oppositeFollower':
                if ((object instanceof Follower || object instanceof BoardSlot) && object.oppositeFollower()) targetDomain.push(object.oppositeFollower())
                break
            case 'adjacentFollowers':
                if ((object instanceof Follower || object instanceof BoardSlot) && object.adjacentFollowers()) targetDomain.push(...object.adjacentFollowers())
                break
            case 'neighbouringFollowers':
                if ((object instanceof Follower || object instanceof BoardSlot) && object.neighbouringFollowers()) targetDomain.push(...object.neighbouringFollowers())
                break
            case 'enemyBoard':
                targetDomain.push(...object.controller().opponent.boardFollowers())
                break
            case 'enemyLeader':
                targetDomain.push(...object.controller().opponent.leaderZone)
                break
            case 'friendlyBoard':
                targetDomain.push(...object.controller().boardFollowers())
                break
            case 'friendlyLeader':
                targetDomain.push(...object.controller().leaderZone)
                break
            case 'friendlyPlayer': 
                targetDomain.push(object.controller())
                break
            case 'enemyPlayer': 
                targetDomain.push(object.controller().opponent)
                break
            case 'enemyHand':
                targetDomain.push(...object.controller().opponent.hand)
                break
            case 'friendlyHand':
                targetDomain.push(...object.controller().hand)
                break
            case 'enemyDeck':
                targetDomain.push(...object.controller().opponent.deck)
                break
            case 'friendlyDeck':
                targetDomain.push(...object.controller().deck)
                break
            case 'enemyCreations':
                targetDomain.push(...object.controller().opponent.creationZone)
                break
            case 'friendlyCreations':
                targetDomain.push(...object.controller().creationZone)
                break
            default:
                break
        }
    })
    return targetDomain
}

export default TargetDomains

import GameObject from "../gameObjects/GameObject"
import { TargetsDomainString } from "../stringTypes/DomainString"
import Follower from "../gameObjects/Follower"
import BoardSlot from "../gameObjects/BoardSlot"