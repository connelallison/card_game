class Permissions {
    constructor(game) {
        this.game = game
    }

    canAttack (attacker, defender) {
        return (
            attacker.canAttack()
            && (defender.type === 'minion' && defender.zone === 'board' || defender.type === 'hero' && defender.zone === 'hero')
            && defender.owner === attacker.owner.opponent
            && this.game.utils.notBehindTaunt(defender)
        )
    }

    canTarget (card, target) {
        return (
            card.targeted 
            && card.targetDomain(card.owner).includes(target)
            && card.targetConstraints.every(constraint => constraint(card.controller(), card, target))
        )
    }

    canPlay (player, card) {
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

module.exports = Permissions