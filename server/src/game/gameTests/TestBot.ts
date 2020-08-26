import Game from "../gameSystems/Game"
import Character from "../gameObjects/Character"
import Follower from "../gameObjects/Follower"

const TestBot = async (game: Game) => {
    if (!game.gameOver && game.turn.activePlayer.bot) {
        await game.sleep(2500)
        // for (card in game.turn.activePlayer.playableCards()) {

        // }
        const playableCard = game.turn.activePlayer.playableCards()[0]
        if (playableCard) {
            if (playableCard instanceof Follower) {
                if (!playableCard.targeted) {
                    game.phases.playPhase({
                        player: game.turn.activePlayer,
                        card: playableCard,
                        targets: [],
                        slot: game.turn.activePlayer.firstEmptySlot(),
                    })
                    game.announceGameState()
                } else {
                    game.phases.playPhase({
                        player: game.turn.activePlayer,
                        card: playableCard,
                        targets: [playableCard.validTargets[0]],
                        slot: game.turn.activePlayer.firstEmptySlot(),
                    })
                    game.announceGameState()
                }
            } else {
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
            }
        } else {
            // console.log('no playable cards')
            // console.log(game.turn.activePlayer)
        }
    }
    if (!game.gameOver && game.turn.activePlayer.bot) {
        const readyFollowers = game.turn.activePlayer.boardFollowers().filter(follower => follower.canAttack())
        for (const follower of readyFollowers) {
            const targets = (follower.owner.opponent.boardFollowers() as Character[]).concat(follower.owner.opponent.leaderZone as Character[])
            for (const target of targets) {
                if (game.permissions.canAttack(follower, target)) {
                    await game.sleep(1000)
                    game.phases.proposedAttackPhase({
                        attacker: follower,
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