const TestBot = async (game) => {
    if (!game.gameOver && game.turn.activePlayer.bot) {
        await game.sleep(1000)
        // for (card in game.turn.activePlayer.playableCards()) {

        // }
        const playableCard = game.turn.activePlayer.playableCards()[0]
        if (playableCard) {
            if (!playableCard.targeted){
                game.phases.playPhase({
                    player: game.turn.activePlayer,
                    card: playableCard
                })
                game.announceGameState()
            } else {
                game.phases.playPhase({
                    player: game.turn.activePlayer,
                    card: playableCard,
                    target: playableCard.validTargets[0]
                })
                game.announceGameState()
            }
        } else {
            // console.log('no playable cards')
            // console.log(game.turn.activePlayer)
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