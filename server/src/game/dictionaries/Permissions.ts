const Permissions = {
    canAttack: (attacker: Character , defender: Character): boolean => {
        return (
            attacker.canAttack()
            && defender.inPlay()
            && defender.controller() === attacker.controller().opponent
            && defender.notBehindGuard()
        )
    },

    canTarget: (card: Card, target: Card): boolean => {
        return (
            card.targeted 
            && card.targetDomain().includes(target)
            && card.targetRequirements.every(requirement => card.targetRequirement(target, requirement))
        )
    },

    canSummon: (player: GamePlayer, card: PersistentCard): boolean => {
        return (
            Permissions.canSummonType(player, card.type)
        )
    },

    canSummonType: (player: GamePlayer, cardType: PersistentCardTypeString): boolean => {
        switch (cardType) {
            case 'Leader':
            case 'LeaderTechnique':
                return true
            case 'Creation':
                return player.creationZone.length < player.max.creationZone
            case 'Follower':
                return player.emptySlotsCount() > 0
            default:
                return false
        }
    },

    canPlay: (player: GamePlayer, card: Card): boolean => {
        return (
            player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && card.cost <= player.money
            && (card.targeted ? card.validTargets.length > 0 : true )
            && (card instanceof Follower ? card.validSlots.length > 0 : card instanceof PersistentCard ? player[card.inPlayZone].length < player.max[card.inPlayZone] : true)
            && card.activeRequirements.every(requirement => card.activeRequirement(requirement))
        )
    },

    canUse: (player: GamePlayer, card: TechniqueCreation | LeaderTechnique): boolean => {
        return (
            player === card.controller()
            && player.myTurn()
            && card.inPlay()
            && card.cost <= player.money
            && (card.targeted ? card.validTargets.length > 0 : true)
            && card.activeRequirements.every(requirement => card.activeRequirement(requirement))
        )
    },
}

export default Permissions

import Card from "../gameObjects/Card"
import GamePlayer from "../gameObjects/GamePlayer"
import Character from "../gameObjects/Character"
import PersistentCard from "../gameObjects/PersistentCard"
import TechniqueCreation from "../gameObjects/TechniqueCreation"
import LeaderTechnique from "../gameObjects/LeaderTechnique"
import Follower from "../gameObjects/Follower"
import { PersistentCardTypeString } from "../stringTypes/ObjectTypeString"

