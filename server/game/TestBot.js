const TestBot = async (game) => {
    if (!game.gameOver && game.turn.activePlayer.bot) {
        await game.sleep(1000)
        if (game.turn.activePlayer.playableCards().length > 0) {
            game.phases.playPhase({
                player: game.turn.activePlayer,
                card: game.turn.activePlayer.playableCards()[0]
            })
            game.announceGameState()
        } else {
            console.log('no playable cards')
            console.log(game.turn.activePlayer)
        }
    }
    if (!game.gameOver && game.turn.activePlayer.bot) {
        game.turn.activePlayer.minionsReadyToAttack().forEach((minion) => {
            // await game.sleep(1000)
            if (minion.owner.opponent.board[0]) {
                game.phases.proposedAttackPhase({
                    attacker: minion,
                    defender: minion.owner.opponent.board[0],
                    cancelled: false,
                })
                game.announceGameState()
            } else {
                game.phases.proposedAttackPhase({
                    attacker: minion,
                    defender: minion.owner.opponent.hero,
                    cancelled: false,
                })
                game.announceGameState()
            }
        })
    }
}

module.exports = TestBot