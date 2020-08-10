import Game from "../Game"
import Unit from "../gameObjects/Unit"
import Card from "../gameObjects/Card"
import GamePlayer from "../gameObjects/GamePlayer"
import Spell from "../gameObjects/Spell"
import Character from "../gameObjects/Character"

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

    canPlay (player: GamePlayer, card: Card): boolean {
        return (
            player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && card.cost <= player.currentMana
            && (card.targeted ? card.validTargets.length > 0 : true )
            && (card instanceof Unit ? player.board.length < player.maxBoard : true)
            && card.playRequirements.every(requirement => requirement(card))
        )
    }
}

export default Permissions