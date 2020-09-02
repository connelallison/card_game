import GameObject from "../gameObjects/GameObject"
import TargetsDomainString from "../stringTypes/TargetsDomainString"

const TargetDomains = (object: GameObject, zones: TargetsDomainString | TargetsDomainString[]) => {
    const targetDomain: GameObject[] = []
    if (typeof zones === 'string') zones = [zones]
    zones.forEach(zone => {
        switch (zone) {
            case 'self':
                targetDomain.push(object.charOwner())
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