class Permissions {
    constructor(game) {
        this.game = game
    }

    canAttack (attacker, defender) {
        return (
            attacker.canAttack()
            && (defender.type === 'minion' && defender.zone === 'board' || defender.type === 'hero' && defender.zone === 'hero')
            && defender.owner === attacker.owner.opponent
        )
    }

    canTarget (card, target) {
        return (
            card.targeted 
            && card.targetDomain(card.owner).includes(target)
            && card.targetConstraints.every(constraint => constraint(card.controller(), card, target))
        )
    }
}

module.exports = Permissions