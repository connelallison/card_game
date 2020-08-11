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
            player[card.inPlayZone].length < player.max[card.inPlayZone]
        )
    }

    canSummonType (player: GamePlayer, cardType: PersistentCardTypeString): boolean {
        const playZone: PlayZoneString = cardType === 'leader' ? 'leader'
                                                        : 'unit' ? 'board'
                                                        : 'creation' ? 'creations'
                                                        : null
        return !!playZone && player[playZone].length < player.max[playZone]
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
}

export default Permissions

import Card from "../gameObjects/Card"
import GamePlayer from "../gameObjects/GamePlayer"
import Character from "../gameObjects/Character"
import PersistentCard from "../gameObjects/PersistentCard"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import PlayZoneString from "../stringTypes/PlayZoneString"

