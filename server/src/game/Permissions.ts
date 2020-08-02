import Game from "./Game"
import Minion from "./Minion"
import Hero from "./Hero"
import Card from "./Card"
import GamePlayer from "./GamePlayer"

class Permissions {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    canAttack (attacker: Minion | Hero , defender: Minion | Hero) {
        return (
            attacker.canAttack()
            && (defender.type === 'minion' && defender.zone === 'board' || defender.type === 'hero' && defender.zone === 'hero')
            && defender.owner === attacker.owner.opponent
            && this.game.utils.notBehindTaunt(defender)
        )
    }

    canTarget (card: Card, target: Card) {
        return (
            card.targeted 
            && card.targetDomain(card.owner).includes(target)
            && card.targetConstraints.every(constraint => constraint(card.controller(), card, target))
        )
    }

    canPlay (player: GamePlayer, card: Card) {
        return (
            player === card.controller()
            && player.myTurn()
            && card.zone === 'hand'
            && card.cost <= player.currentMana
            && (card.type !== 'spell' || !card.targeted || card.validTargets.length > 0)
            && (card.type !== 'minion' || player.board.length < player.maxBoard)
        )
    }
}

export default Permissions