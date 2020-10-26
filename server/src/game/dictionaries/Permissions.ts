const Permissions = {
    canAttack: (attacker: Character, defender: Character): boolean => {
        return (
            attacker.canAttack()
            && defender.inPlay()
            && defender.controller() === attacker.opponent()
            && defender.notBehindGuard()
            && !(attacker.flags.mob && defender instanceof Leader && !defender.unprotected())
            && (
                !(attacker instanceof Follower)
                || !attacker.summonSickness
                || (defender instanceof Follower && attacker.flags.rush)
                || attacker.flags.mob
            )
        )
    },

    // canTarget: (card: Card, target: Card): boolean => {
    //     return (
    //         card.targeted
    //         && card.targetDomain().includes(target)
    //         && card.targetRequirements.every(requirement => card.targetRequirement(requirement, target))
    //     )
    // },

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
            case 'Passive':
                return player.passiveZone.length < player.max.passiveZone
            case 'Follower':
                return player.emptySlotsCount() > 0
            default:
                return false
        }
    },

    canPlay: (player: GamePlayer, card: Card): boolean => {
        // console.log('active', card.active())
        return (
            player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && (card.cost <= player.money || card.cost <= 0)
            && ((card instanceof Moment || card instanceof TechniqueCreation) ? card.active() : true)
            && ((card instanceof Follower ? card.validSlots.length > 0 : card instanceof PersistentCard ? Permissions.canSummon(player, card) : true))
        )
    },

    canUse: (player: GamePlayer, card: Card): boolean => {
        // console.log('controller', card.name.english, player === card.controller())
        // console.log('myturn', card.name.english, player.myTurn())
        // console.log('type', card.name.english, (card instanceof TechniqueCreation || card instanceof LeaderTechnique))
        // console.log('cost', card.name.english, card.cost <= player.money)
        // console.log('active', card.name.english, card.active())
        // console.log('overall', card.name.english, (
        //     player === card.controller()
        //     && player.myTurn()
        //     && (card instanceof TechniqueCreation || card instanceof LeaderTechnique)
        //     && card.inPlay()
        //     && card.cost <= player.money
        //     && card.active()
        // ))

        return (
            player === card.controller()
            && player.myTurn()
            && (card instanceof TechniqueCreation || card instanceof LeaderTechnique)
            && card.inPlay()
            && (card.cost <= player.money || card.cost <= 0)
            && card.active()
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
import Moment from "../gameObjects/Moment"
import { PersistentCardTypeString } from "../stringTypes/ZoneTypeSubtypeString"
import Leader from "../gameObjects/Leader"
