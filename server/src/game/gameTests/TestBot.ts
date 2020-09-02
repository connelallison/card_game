import Game from "../gamePhases/Game"
import Character from "../gameObjects/Character"
import Follower from "../gameObjects/Follower"
import PlayEvent from "../gameEvents/PlayEvent"
import AttackEvent from "../gameEvents/AttackEvent"
import Permissions from "../dictionaries/Permissions"

const TestBot = async (game: Game) => {
    if (!game.ended && game.activeChild.activePlayer.bot) {
        await game.sleep(2500)
        const playableCard = game.activeChild.activePlayer.playableCards()[0]
        if (playableCard) {
            const slot = playableCard instanceof Follower ? {slot: game.activeChild.activePlayer.firstEmptySlot()} : {}
            const targets = playableCard.targeted ? [playableCard.validTargets[0]] : []
            const eventObj = Object.assign(slot, {
                player: game.activeChild.activePlayer,
                card: playableCard,
                targets,
            })
            const playEvent = new PlayEvent(game, eventObj)
            game.startSequence('PlayPhase', playEvent)
            game.announceGameState()
        }
    }
    if (!game.ended && game.activeChild.activePlayer.bot) {
        const readyFollowers = game.activeChild.activePlayer.boardFollowers().filter(follower => follower.canAttack())
        for (const follower of readyFollowers) {
            const targets = (follower.owner.opponent.boardFollowers() as Character[]).concat(follower.owner.opponent.leaderZone as Character[])
            for (const target of targets) {
                if (Permissions.canAttack(follower, target)) {
                    await game.sleep(1000)
                    const attackEvent = new AttackEvent(game, {
                        attacker: follower,
                        defender: target,
                    })
                    game.startSequence('ProposedAttackPhase', attackEvent)
                    game.announceGameState()
                    break
                }
            }
        }
    }
    if (!game.ended && game.activeChild.activePlayer.bot) {
        await game.sleep(2500)
        game.executeEndTurnRequest(game.activeChild.activePlayer)
    }
}

export default TestBot