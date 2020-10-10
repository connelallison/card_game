const autoOptions = (playableCard: Card) => {
    return playableCard.activeOptions.map(option => {
        const chosenTargets = option.activeActions[0].activeSteps.map(step =>
            step.manualTargets?.map(target => playableCard.dynamicTargets(target.targets)[0].objectID) ?? []
        )
        return { chosenAction: 0, chosenTargets }
    })
}

const autoActions = (playableCard: Card) => {
    return playableCard.activeActions.map(action =>
        action.activeSteps.map(step =>
            step.manualTargets?.map(target => playableCard.dynamicTargets(target.targets)[0].objectID) ?? []
        )
    )
}

const TestBot = async (game: Game) => {
    if (!game.ended && game.activeChild.activePlayer.bot) {
        const player = game.activeChild.activePlayer
        await game.sleep(2500)
        while (!game.ended && player.playableCards().length > 0) {
            const playableCard = player.playableCards()[0]
            const moveRequest: MoveRequest = {
                selected: playableCard.objectID,
                selectedSlot: null,
                attackTarget: null,
                options: null,
                actions: null,
            }
            if (playableCard instanceof Follower) moveRequest.selectedSlot = playableCard.validSlots[0].objectID
            if (playableCard.activeOptions.length > 0) moveRequest.options = autoOptions(playableCard)
            if (playableCard.activeActions.length > 0) moveRequest.actions = autoActions(playableCard)
            game.executeMoveRequest(moveRequest, player)
            await game.sleep(1000)
        }
        while (!game.ended && player.leaderTechniqueZone[0].canBeUsed()) {
            const leaderTechnique = player.leaderTechniqueZone[0]
            const moveRequest: MoveRequest = {
                selected: leaderTechnique.objectID,
                selectedSlot: null,
                attackTarget: null,
                options: null,
                actions: null,
            }
            if (leaderTechnique.activeOptions.length > 0) moveRequest.options = autoOptions(leaderTechnique)
            if (leaderTechnique.activeActions.length > 0) moveRequest.actions = autoActions(leaderTechnique)
            game.executeMoveRequest(moveRequest, player)
            await game.sleep(1000)
        }
        while (!game.ended && player.creationZone.filter(creation => creation.subtype === 'Technique').filter((technique: TechniqueCreation) => technique.canBeUsed()).length > 0) {
            const useableTechnique = player.creationZone.filter(creation => creation.subtype === 'Technique').filter((technique: TechniqueCreation) => technique.canBeUsed())[0] as TechniqueCreation
            const moveRequest: MoveRequest = {
                selected: useableTechnique.objectID,
                selectedSlot: null,
                attackTarget: null,
                options: null,
                actions: null,
            }
            if (useableTechnique.activeOptions.length > 0) moveRequest.options = autoOptions(useableTechnique)
            if (useableTechnique.activeActions.length > 0) moveRequest.actions = autoActions(useableTechnique)
            game.executeMoveRequest(moveRequest, player)
            await game.sleep(1000)
        }
        while (!game.ended && player.boardFollowers().filter(follower => follower.attackTargets.length > 0).length > 0) {
            const follower = player.boardFollowers().filter(follower => follower.attackTargets.length > 0)[0]
            const moveRequest: MoveRequest = {
                selected: follower.objectID,
                selectedSlot: null,
                attackTarget: null,
                options: null,
                actions: null,
            }
            moveRequest.attackTarget = follower.attackTargets[0].objectID
            game.executeMoveRequest(moveRequest, player)
            await game.sleep(1000)
        }
    }
    if (!game.ended && game.activeChild.activePlayer.bot) {
        // await game.sleep(2500)
        await game.sleep(500)
        game.executeEndTurnRequest(game.activeChild.activePlayer)
    }
}

export default TestBot

import Game from "../gamePhases/Game"
import Character from "../gameObjects/Character"
import Follower from "../gameObjects/Follower"
import Permissions from "../dictionaries/Permissions"
import { PlayEvent } from "../gamePhases/PlayPhase"
import { AttackEvent } from "../gamePhases/AttackPhase"
import { MoveRequest } from "../structs/ObjectReport"
import { OptionChoiceRequest } from "../structs/Action"
import Card from "../gameObjects/Card"
import TechniqueCreation from "../gameObjects/TechniqueCreation"

