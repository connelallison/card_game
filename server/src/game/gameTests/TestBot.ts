import Game from "../Game"
import Character from "../gameObjects/Character"

const TestBot = async (game: Game) => {
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
        const readyMinions = game.turn.activePlayer.board.filter(minion => minion.canAttack())
        for (const minion of readyMinions) {
            const targets = (minion.owner.opponent.board as Character[]).concat(minion.owner.opponent.leader as Character[])
            for (const target of targets) {
                if (game.permissions.canAttack(minion, target)) {
                    await game.sleep(1000)
                    game.phases.proposedAttackPhase({
                        attacker: minion,
                        defender: target,
                    })
                    game.announceGameState()
                    break
                }
            }
        }
    }
}

export default TestBot