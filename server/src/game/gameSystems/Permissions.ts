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
            && card.targetDomain().includes(target)
            && card.targetRequirements.every(requirement => requirement(target))
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
            case 'LeaderTechnique':
                return true
            case 'Creation':
                return player.creationZone.length < player.max.creationZone
            case 'Follower':
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
            && card.cost <= player.rawMoney
            && (card.targeted ? card.validTargets.length > 0 : true )
            && (card instanceof PersistentCard ? player[card.inPlayZone].length < player.max[card.inPlayZone] : true)
            && card.playRequirements.every(requirement => requirement())
        )
    }

    canUse (player: GamePlayer, card: TechniqueCreation | LeaderTechnique): boolean {
        return (
            player === card.controller()
            && player.myTurn()
            && card.inPlay()
            && card.cost <= player.rawMoney
            && (card.targeted ? card.validTargets.length > 0 : true)
            && card.playRequirements.every(requirement => requirement())
        )
    }
}

export default Permissions

import Card from "../gameObjects/Card"
import GamePlayer from "../gameObjects/GamePlayer"
import Character from "../gameObjects/Character"
import PersistentCard from "../gameObjects/PersistentCard"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import TechniqueCreation from "../gameObjects/TechniqueCreation"
import LeaderTechnique from "../gameObjects/LeaderTechnique"

