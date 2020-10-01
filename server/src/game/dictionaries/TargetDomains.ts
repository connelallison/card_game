const TargetDomains = (object: GameObject, zones: TargetsDomainString | TargetsDomainString[]) => {
    const targetDomain: GameObject[] = []
    if (typeof zones === 'string') zones = [zones]
    const effectOwner = object.effectOwner()
    zones.forEach(zone => {
        switch (zone) {
            case 'self':
                targetDomain.push(effectOwner)
                break
            case 'leftFollower':
                if ((effectOwner instanceof Follower || effectOwner instanceof BoardSlot) && effectOwner.leftFollower()) targetDomain.push(effectOwner.leftFollower())
                break
            case 'rightFollower':
                if ((effectOwner instanceof Follower || effectOwner instanceof BoardSlot) && effectOwner.rightFollower()) targetDomain.push(effectOwner.rightFollower())
                break
            case 'oppositeFollower':
                if ((effectOwner instanceof Follower || effectOwner instanceof BoardSlot) && effectOwner.oppositeFollower()) targetDomain.push(effectOwner.oppositeFollower())
                break
            case 'adjacentFollowers':
                if ((effectOwner instanceof Follower || effectOwner instanceof BoardSlot) && effectOwner.adjacentFollowers()) targetDomain.push(...effectOwner.adjacentFollowers())
                break
            case 'neighbouringFollowers':
                if ((effectOwner instanceof Follower || effectOwner instanceof BoardSlot) && effectOwner.neighbouringFollowers()) targetDomain.push(...effectOwner.neighbouringFollowers())
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
            case 'enemyLegacy': 
                targetDomain.push(...object.controller().opponent.legacy)
            case 'friendlyLegacy': 
                targetDomain.push(...object.controller().legacy)
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