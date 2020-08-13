import Game from "./Game"

class Permissions {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    canAttack (attacker: Character , defender: Character): boolean {
        return (
            attacker.canAttack()
            && defender.inPlay()
            && defender.controller() === attacker.controller().opponent
            && this.game.utils.notBehindGuard(defender)
        )
    }

    canTarget (card: Card, target: Card): boolean {
        return (
            card.targeted 
            && card.targetDomain(card.controller()).includes(target)
            && card.targetRequirements.every(requirement => requirement(card, target))
        )
    }

    canSummon (player: GamePlayer, card: PersistentCard): boolean {
        return (
            this.canSummonType(player, card.type)
        )
    }

    canSummonType (player: GamePlayer, cardType: PersistentCardTypeString): boolean {
        switch (cardType) {
            case 'Leader':
            case 'LeaderAbility':
                return true
            case 'Creation':
                return player.creationZone.length < player.max.creationZone
            case 'Unit':
                return player.board.length < player.max.board
            default:
                return false
        }
    }

    canPlay (player: GamePlayer, card: Card): boolean {
        return (
            player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && card.cost <= player.currentMana
            && (card.targeted ? card.validTargets.length > 0 : true )
            && (card instanceof PersistentCard ? player[card.inPlayZone].length < player.max[card.inPlayZone] : true)
            && card.playRequirements.every(requirement => requirement(card))
        )
    }

    canUse (player: GamePlayer, card: AbilityCreation | LeaderAbility): boolean {
        return (
            player === card.controller()
            && player.myTurn()
            && card.inPlay()
            && card.cost <= player.currentMana
            && (card.targeted ? card.validTargets.length > 0 : true)
            && card.playRequirements.every(requirement => requirement(card))
        )
    }
}

export default Permissions

import Card from "../gameObjects/Card"
import GamePlayer from "../gameObjects/GamePlayer"
import Character from "../gameObjects/Character"
import PersistentCard from "../gameObjects/PersistentCard"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import PlayZoneString from "../stringTypes/PlayZoneString"
import AbilityCreation from "../gameObjects/AbilityCreation"
import LeaderAbility from "../gameObjects/LeaderAbility"

