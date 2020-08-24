import Game from "../gameSystems/Game"
import Character from "../gameObjects/Character"

const TestBot = async (game: Game) => {
    if (!game.gameOver && game.turn.activePlayer.bot) {
        await game.sleep(2500)
        // for (card in game.turn.activePlayer.playableCards()) {

        // }
        const playableCard = game.turn.activePlayer.playableCards()[0]
        if (playableCard) {
            if (!playableCard.targeted) {
                game.phases.playPhase({
                    player: game.turn.activePlayer,
                    card: playableCard,
                    targets: []
                })
                game.announceGameState()
            } else {
                game.phases.playPhase({
                    player: game.turn.activePlayer,
                    card: playableCard,
                    targets: [playableCard.validTargets[0]]
                })
                game.announceGameState()
            }
        } else {
            // console.log('no playable cards')
            // console.log(game.turn.activePlayer)
        }
    }
    if (!game.gameOver && game.turn.activePlayer.bot) {
        const readyFollowers = game.turn.activePlayer.board.filter(unit => unit.canAttack())
        for (const unit of readyFollowers) {
            const targets = (unit.owner.opponent.board as Character[]).concat(unit.owner.opponent.leaderZone as Character[])
            for (const target of targets) {
                if (game.permissions.canAttack(unit, target)) {
                    await game.sleep(1000)
                    game.phases.proposedAttackPhase({
                        attacker: unit,
                        defender: target,
                    })
                    game.announceGameState()
                    break
                }
            }
        }
    }
    if (!game.gameOver && game.turn.activePlayer.bot) {
        await game.sleep(3000)
        game.executeEndTurnRequest(game.turn.activePlayer)
    }
}

export default TestBot