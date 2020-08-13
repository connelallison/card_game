import Game from "./Game"

class Utils {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    shuffle(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]
        }
    }

    forEachBackward(array: any[], callback) {
        for (let i = array.length - 1; i >= 0; i--) {
            callback(array[i])
        }
    }

    findBackward(array: any[], callback) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (callback(array[i])) return array[i]
        }
    }

    findMinByCriterion(array, criterion) {
        let minObj
        if (array.length > 0) {
            minObj = array[0]
            array.forEach(obj => {
                if (criterion(obj) < criterion(minObj)) minObj = obj
            })
        }
        return minObj
    }

    targetDomain(zones) {
        return (player) => {
            const targetDomain = []
            zones.forEach(zone => {
                switch (zone) {
                    case 'enemyUnits':
                        targetDomain.push(...player.opponent.board)
                        break
                    case 'enemyLeader':
                        targetDomain.push(...player.opponent.leaderZone)
                        break
                    case 'friendlyUnits':
                        targetDomain.push(...player.board)
                        break
                    case 'friendlyLeader':
                        targetDomain.push(...player.leaderZone)
                        break
                    default:
                        break
                }
            })
        return targetDomain
        }
    }

    notBehindGuard(character: Character) {
        return character.flags.guard || character.controller().board.every(unit => unit.flags.guard !== true)
    }
}

export default Utils

import Character from "../gameObjects/Character";
